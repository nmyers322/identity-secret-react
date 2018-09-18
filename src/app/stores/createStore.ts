import { History } from 'history';
import { GenericModel } from 'app/models';
import { GenericStore } from './GenericStore';
import { RouterStore } from './RouterStore';
import { STORE_GENERIC, STORE_ROUTER } from 'app/constants';

export function createStores(history: History, defaultItems?: GenericModel[]) {
      const genericStore = new GenericStore(defaultItems);
      const routerStore = new RouterStore(history);
      return {
          [STORE_GENERIC]: genericStore,
          [STORE_ROUTER]: routerStore
      };
}
