import { IMessage } from './messages.interface';

export class MessagesModel {
	constructor(
		private _messages: IMessage[] = [],
		private _userId: number,
	) {
	}

	public get messages(): IMessage[] {
		return this._messages;
	}

	public get userId(): number {
		return this._userId
	}

	public addMessage(message: string): void {
		this.messages.unshift({
			userId: 0,
			date: new Date,
			message
		});
	}
}
