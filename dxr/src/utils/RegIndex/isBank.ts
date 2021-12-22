import { EmptyReg } from "./isEmpty";
import { Notify } from "vant";

export class BankReg {
  public static isBank(bank: string) {
    const name: string = "银行卡号";
    const bankReg: any = /^([1-9]{1})(\d{15}|\d{18})$/;
    if (EmptyReg.isEmpty(bank, name)) {
      return false;
    }
    if (bankReg.test(bank)) {
      return true;
    } else {
      Notify({ type: "danger", message: `${name}格式不正确` });
    }
  }
}
