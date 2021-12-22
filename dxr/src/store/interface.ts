import userStateTypes from "./modules/userinfo/interface";

export default interface RootStateTypes {
  test?: any;
}

export interface AllStateTypes extends RootStateTypes {
  userinfoModule: userStateTypes;
}
