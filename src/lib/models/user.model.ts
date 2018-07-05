import * as crypto from 'crypto';

export interface UserData {
    id?: string;
    name: string;
    limit: number;
}

export class User {
    
    id: string;
    name: string;
    limit: number;

    constructor(data: UserData) {
        this.id = data.id || crypto.randomBytes(16).toString('hex');
        this.name = data.name;
        this.limit = data.limit;
    }
}