import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser, IUsers } from './interfaces';

@Injectable({
	providedIn: 'root'
})
export class AppApiService {
	constructor(
		private httpClient: HttpClient
	) {
	}

	public fetchUsersList$(): Observable<IUser[]> {
		return this.httpClient.get<IUsers>('./assets/users.json').pipe(
			pluck('users')
		)
	}
}
