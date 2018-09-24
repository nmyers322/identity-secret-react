import { observable } from 'mobx';

export class IdModel {
    @observable public id: string;

    constructor(id: string) {
        this.id = id;
    }
}

export default IdModel;
