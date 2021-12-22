import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";

import userinfoModule from "../store/modules/userinfo/index";

import RootStateTypes, { AllStateTypes } from "./interface";

export default createStore<RootStateTypes>({
  modules: {
    userinfoModule,
  },
});
export const key: InjectionKey<Store<RootStateTypes>> = Symbol("vue-store");

export function useStore<T = AllStateTypes>() {
  return baseUseStore<T>(key);
}
