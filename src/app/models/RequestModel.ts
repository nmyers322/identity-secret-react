import { observable } from 'mobx';

export class RequestModel {
    @observable public id: string;
    @observable public owner: string;
    @observable public requester: string;
    @observable public created: Date;
    @observable public claims: string[];
    @observable public accepted: boolean;

    constructor(id: string, owner: string, requester: string, created: Date, claims: string[], accepted: boolean) {
        this.id = id;
        this.owner = owner;
        this.requester = requester;
        this.created = created;
        this.claims = claims;
        this.accepted = accepted;
    }
}

export default RequestModel;