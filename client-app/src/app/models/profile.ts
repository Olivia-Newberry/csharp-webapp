import { User } from "./user";

export class Profile {
    userName: string;
    displayName: string;
    image?: string;
    bio?: string;
    followersCount: number = 0;
    followingCount: number = 0;
    following: boolean = false;
    followedBy: boolean = false;
    photos?: Photo[];

    constructor(user: User) {
        this.userName = user.userName;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}