import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FADE } from '../animations';

@Component({
	selector: 'app-massages-user-status',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
        <div @fade *ngIf="showMessageStatus" class="alert alert-light p-2 fst-italic small text-center" role="alert">
            User currently is {{ isOnline ? 'Online' : 'Offline'}}
        </div>
	`,
	animations: FADE,
})
export class MessagesUserStatusComponent {
	private _isOnline = false;

	public showMessageStatus = false;

	constructor(private cdr: ChangeDetectorRef) {
	}

	@Input() set isOnline(isOnline: boolean) {
		this._isOnline = isOnline;

		this.handleStatusChanges();
		this.cdr.markForCheck();
	};

	get isOnline(): boolean {
		return this._isOnline;
	}

	public handleStatusChanges() {
		this.showMessageStatus = true;

		setTimeout(() => {
			this.showMessageStatus = false;
			this.cdr.markForCheck();
		}, 3000)
	}
}
