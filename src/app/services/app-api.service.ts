import { Observable, timer } from 'rxjs';
import { concatMap, pluck, shareReplay, take } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IMessages, IUser, IUsers, IUserStatus, IUserStatuses } from '../models';


@Injectable({
	providedIn: 'root'
})
export class AppApiService {
	private readonly chatCache$: Map<number, Observable<IMessages>> = new Map();

	constructor(
		private httpClient: HttpClient
	) {
	}

	public fetchUsersList$(): Observable<IUser[]> {
		return this.httpClient.get<IUsers>(`./assets/users.json`).pipe(pluck('users'))
	}

	public fetchChatByUserId$(userId: number): Observable<IMessages> {
		if (!this.chatCache$.has(userId)) {
			const request$ = this.httpClient.get<IMessages>(`./assets/chats/messages-${userId}.json`).pipe(
				shareReplay()
			)

			this.chatCache$.set(userId, request$);
		}

		return this.chatCache$.get(userId);
	}

	public fetchUserStatuses$(): Observable<IUserStatus[]> {
		return timer(0, 4000).pipe(
			concatMap((iteration) => this.httpClient.get<IUserStatuses>(`./assets/statuses/users-statuses-${iteration}.json`)
					.pipe(pluck('statuses'))
			),
			take(5),
		)
	}
}
