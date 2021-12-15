export interface IUsers {
	users: IUser[]
}

export interface IUser {
	id: number;
	name: string;
	unreadMessageCount: number;
	isOnline: boolean;
	picture: string;
}
