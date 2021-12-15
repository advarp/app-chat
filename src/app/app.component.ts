import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
        <div class="container p-4 mt-4">
            <div class="row">
                <div class="bg-white p-3 d-flex rounded app-min-height">
                    <div class="col-3">
                        <app-users-list></app-users-list>
                    </div>
                    <div class="col-9 ps-4">
                        <app-messages></app-messages>
                    </div>
                </div>
            </div>
        </div>
	`,
	styles: ['.app-min-height { min-height: 400px }']
})
export class AppComponent {
}
