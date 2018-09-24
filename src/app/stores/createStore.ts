import { History } from 'history';
import { IdModel } from 'app/models/IdModel';
import { IdStore } from './IdStore';
import { RouterStore } from './RouterStore';
import { STORE_ID, STORE_ROUTER } from 'app/constants';

export function createStores(history: History, defaultItems?: IdModel[]) {
      const idStore = new IdStore(defaultItems);
      const routerStore = new RouterStore(history);
      return {
          [STORE_ID]: idStore,
          [STORE_ROUTER]: routerStore
      };
}
