import { observable, computed, action } from 'mobx';
import { GenericModel } from 'app/models';

export class GenericStore {
    constructor(fixtures: GenericModel[]) {
        this.items = fixtures;
    }

    @observable public items: Array<GenericModel>;

    @computed
    get itemTexts() : string[] {
        return this.items.map((item) => item.text);
    }

    @action
    updateText = (item: GenericModel, newText: string) : void => {
        item.text = newText;
    }
}

export default GenericStore;
