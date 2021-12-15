import { combineLatest, Observable, Subject } from 'rxjs';
import { map, pluck, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { AppApiService } from './app-api.service';
import { MessagesModel, UserModel, UsersModel } from '../models';


@Injectable({
	providedIn: 'root',
})
export class ChatService {
	public readonly activeChat$: Subject<UserModel> = new Subject<UserModel>();

	constructor(
		private readonly appApiService: AppApiService,
	) {
	}

	public getUsersWithStatuses$(): Observable<UsersModel> {
		return combineLatest([
			this.appApiService.fetchUsersList$(),
			this.appApiService.fetchUserStatuses$(),
		]).pipe(
			map(([users, statuses]) =>
				UsersModel.create(users, statuses)
			),
		)
	}

	private getMessagesByUserId$(userId: number): Observable<MessagesModel> {
		return this.appApiService.fetchChatByUserId$(userId)
			.pipe(
				pluck('messages'),
				map((messages) => new MessagesModel(messages, userId))
			)
	}

	public userWithMessages$(): Observable<UserModel | null> {
		let user: UserModel;

		return this.activeChat$.pipe(
			tap((data) => user = data),
			switchMap((user: UserModel) => this.getMessagesByUserId$(user.id)),
			map((messages) => user.updateUserMessages(messages)),
		)
	}

	public openChatWithUser(user: UserModel): void {
		this.activeChat$.next(user);
	}

}
