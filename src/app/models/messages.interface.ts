export interface IMessages {
	messages: IMessage[];
}

export interface IMessage {
	userId: number;
	date: Date,
	message: string;
}
