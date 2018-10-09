import { observable } from 'mobx';

export class AttributeModel {
    @observable public id: string;
    @observable public owner: string;
    @observable public name: string;
    @observable public value: string;
    @observable public updated: Date;

    constructor(id: string) {
        this.id = id;
    }
}

export default AttributeModel;