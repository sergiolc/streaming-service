
export interface UserData {
    id: string;
    name: string;
    limit: number;
}

export class User {
    
    id: string;
    name: string;
    limit: number;

    constructor(data: UserData) {
        this.id = data.id;
        this.name = data.name;
        this.limit = data.limit;
    }
}