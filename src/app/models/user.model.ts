import { IUser } from './users.interface';
import { IUserStatus } from './user-status.interface';
import { MessagesModel } from './messages.model';
import { IMessage } from './messages.interface';

export class UserModel implements IUser, IUserStatus {
	private _messages: MessagesModel;

	constructor(
		public readonly id: number,
		public readonly name: string,
		public readonly picture: string,
		public isOnline: boolean = false,
	) {
	}

	public get messages(): IMessage[] {
		return this._messages?.messages;
	}

	public updateUserMessages(messages: MessagesModel): UserModel {
		this._messages = messages;

		return this;
	}

	public addMessage(message: string): void {
		this._messages.addMessage(message);
	}

	static createUserModel(
		user: IUser,
		status: IUserStatus,
	): UserModel {
		return new UserModel(
			user.id,
			user.name,
			user.picture,
			status?.isOnline || false,
		)
	}
}
