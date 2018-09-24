import { observable, action } from 'mobx';
import { IdModel } from 'app/models/IdModel';

export class IdStore {
    constructor(fixtures: IdModel[]) {
        this.ids = fixtures;
    }

    @observable public ids: Array<IdModel>;

    @action
    addId = (id: string) : void => {
        this.ids.push(new IdModel(id));
    }

    @action
    deleteId = (id: IdModel) : void => {
        let newIds = [...this.ids];
        newIds = newIds.filter((checkId: IdModel) => (checkId.id !== id.id));
        this.ids = newIds;
    }

    @action
    reloadIds = (ids: string[]) : void => {
        this.ids = ids.map((id: string) => (new IdModel(id)));
    }
}

export default IdStore;
