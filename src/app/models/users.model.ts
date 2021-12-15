import { UserModel } from './user.model';
import { IUser } from './users.interface';
import { IUserStatus } from './user-status.interface';

export class UsersModel {

	constructor(
		private _users: UserModel[] = []
	) {
	}

	public get users(): UserModel[] {
		return this._users;
	}

	static create(users: IUser[], statuses: IUserStatus[]): UsersModel {
		const data = users.map(user => {
			const statusByUserId = statuses.find(x => x.id === user.id);

			return UserModel.createUserModel(user, statusByUserId)
		})

		return new UsersModel(data)
	}
}
