import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'app-user-status',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
        <div class="user-status" [ngClass]="{'user-status-active': isOnline}"></div>
	`,
	styles: [
		'.user-status {width: 8px; height: 8px; background-color: lightgray; margin-left: auto; border-radius: 100%; }',
		'.user-status-active {background-color: green;}'
	],
})
export class UserStatusComponent {
	@Input()
	public isOnline: boolean = false;
}
