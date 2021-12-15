import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { AppApiService, ChatService } from '../services';
import { UserModel } from '../models';
import { FADE } from '../animations';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-messages',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
        <div class="d-flex flex-column bg-info border rounded h-100 p-2 messages-max-height">
            <ng-container *ngIf="activeChat; else emptyMessages">
                <div class="d-flex flex-column-reverse messages-body">
                    <app-message *ngFor="let message of activeChat.messages"
                                 [userId]="message.userId"
                                 [message]="message"
                                 [avatarUrl]="activeChat.picture"
                                 @fade
                    ></app-message>
                </div>


                <app-massages-user-status [isOnline]="activeChat.isOnline"></app-massages-user-status>
               
                <form class="form-group mt-auto">
                    <input type="text" (keydown)="onSubmitMessage($event, activeChat)" class="form-control"
                           placeholder="Write a message...">
                </form>

            </ng-container>
        </div>

        <ng-template #emptyMessages>
            <div class="text-center my-auto w-100">
				<span class="small bg-white border rounded py-2 px-3">
                    Please select a chat to start messaging
				</span>
            </div>
        </ng-template>
	`,
	styles: [
		'.messages-body { overflow-y: auto; height: 100%}',
		'.messages-max-height { max-height: 560px;}'
	],
	animations: FADE,
})
export class MessagesComponent implements OnInit, OnDestroy {
	public activeChat: UserModel;
	private subscription: Subscription;

	constructor(
		private apiService: AppApiService,
		private chatService: ChatService,
		private cdr: ChangeDetectorRef,
	) {
	}

	public ngOnInit(): void {
		this.subscription = this.chatService.userWithMessages$().subscribe(chatWithUser => {
			this.activeChat = chatWithUser
			this.cdr.markForCheck();
		})

		// Not need to unsubscribe case uses take(5)
		this.apiService.fetchUserStatuses$()
			.subscribe(statuses => {
				if (this.activeChat) {
					this.activeChat.isOnline = statuses.find(s => s.id === this.activeChat.id)?.isOnline || false;
					this.cdr.markForCheck();
				}
			})
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	public onSubmitMessage(event: KeyboardEvent, user: UserModel): void {
		if (event.code === 'Enter') {
			const input = event.target as HTMLInputElement;
			const message = input.value;

			user.addMessage(message);
			input.value = '';
			event.preventDefault();
		}
	}
}
