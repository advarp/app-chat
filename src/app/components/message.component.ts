import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IMessage } from '../models';

@Component({
	selector: 'app-message',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
        <div class="d-flex">
			<ng-container *ngIf="me; else user">
				<div class="bg-white rounded-circle me-2 overflow-hidden border avatar-size">
					<img src="https://robohash.org/54acb26befa52276421882ad945df10d?set=set4&bgset=&size=200x200" alt="">
				</div>
            </ng-container>
			
            <div class="my-message-body d-inline-block rounded py-1 px-3 mb-3 w-auto small" [ngClass]="{'bg-white': !me}">
                <div class="">{{ message.message }}</div>
                <div class="small text-muted text-end">{{ message.date | date: 'shortTime' }}</div>
            </div>
        </div>
		
		
		<ng-template #user>
            <div class="bg-white rounded-circle me-2 overflow-hidden border avatar-size">
                <img [src]="avatarUrl"  alt="">
            </div>
		</ng-template>
	`,
	styles: [
		'.avatar-size {width: 35px; height: 35px;}',
		'.avatar-size img {width: 35px; height: 35px }',
		'.my-message-body { background-color: #91f7ff}'
	]
})
export class MessageComponent {

	@Input()
	public userId: number;

	@Input()
	public message: IMessage;

	@Input()
	public avatarUrl: string;

	public get me(): boolean {
		// hardcoded our userid
		return this.userId === 0;
	}

}
