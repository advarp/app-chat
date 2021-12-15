import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ChatService } from '../services';
import { UserModel } from '../models';


@Component({
	selector: 'app-users-list',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
        <div class="list-group list-group-flush">
            <ng-container *ngFor="let user of usersList$ | async; trackBy:userById">
                <app-user-list
                        [user]="user"
                        (click)="onOpenChat(user)"
                        role="button"
                        class="list-group-item list-group-item-action"
                ></app-user-list>
            </ng-container>
        </div>
	`,
})
export class UsersListComponent implements OnInit {
	public usersList$: Observable<UserModel[]>;

	constructor(
		private readonly chatService: ChatService,
	) {
	}

	public ngOnInit(): void {
		this.usersList$ = this.chatService.getUsersWithStatuses$().pipe(
			pluck('users')
		);
	}

	public onOpenChat(user: UserModel): void {
		this.chatService.openChatWithUser(user);
	}

	public userById(index, user): number {
		return user.id;
	}
}
