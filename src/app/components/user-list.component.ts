import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { UserModel } from '../models';

@Component({
	selector: 'app-user-list',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
        <div class="d-flex align-items-center w-100">
            <div class="border rounded-circle overflow-hidden me-2 position-relative avatar-size">
                <img [src]="user.picture" [alt]="user.name">
            </div>

            <div class="d-flex flex-column">
                <div class="lh-1 fw-bolder">{{ user.name }}</div>
            </div>

            <app-user-status
                    class="ms-auto"
                    [isOnline]="user.isOnline"
            ></app-user-status>
        </div>
	`,
	styles: [
		'.avatar-size {width: 40px; height: 40px;}',
		'.avatar-size img {width: 40px; height: 40px }',
	]
})
export class UserListComponent {

	@Input()
	public user: UserModel;

}
