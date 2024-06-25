import { User } from "./user";

export class Profile {
    constructor(user: User) {
        this.userName = user.userName;
        this.displayName = user.displayName;
        this.image = user.image;
    }

    userName: string;
    displayName: string;
    image?: string;
    bio?: string;
}