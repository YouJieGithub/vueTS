import {IDataType, jjRequest} from "../service";

/**
 *  查询开户行信息
 *  根据当前银行卡号查询开户行
 * @return list
 */
export const bankInfo = (data: any) => {
  return jjRequest.request<IDataType>({
    url: "/staff/bankInfo",
    method: "post",
    data: data,
  });
};
