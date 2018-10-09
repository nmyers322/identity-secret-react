import { History } from 'history';
import { IdStore } from './IdStore';
import { RequestStore } from './RequestStore';
import { RouterStore } from './RouterStore';
import { STORE_ID, STORE_ROUTER, STORE_REQUEST } from 'app/constants';

export function createStores(history: History) {
      const idStore = new IdStore();
      const requestStore = new RequestStore();
      const routerStore = new RouterStore(history);
      return {
          [STORE_ID]: idStore,
          [STORE_REQUEST]: requestStore,
          [STORE_ROUTER]: routerStore
      };
}
