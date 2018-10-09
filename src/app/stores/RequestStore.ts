import { observable, action } from 'mobx';
import { RequestModel } from 'app/models/RequestModel';

export class RequestStore {
    constructor() {
        this.requests = [];
    }

    @observable public requests: Array<RequestModel>;

    @action
    addRequest = (request: RequestModel) : void => {
        this.requests.push(request);
    }


    // @action
    // reloadRequests = (ids: string[]) : void => {
    //     this.ids = ids.map((id: string) => (new RequestModel(id)));
    // }
}

export default RequestStore;
