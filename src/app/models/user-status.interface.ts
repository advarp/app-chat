export interface IUserStatuses {
	statuses: IUserStatus[]
}

export interface IUserStatus {
	id: number;
	unreadMessageCount: number;
	isOnline: boolean;
}
