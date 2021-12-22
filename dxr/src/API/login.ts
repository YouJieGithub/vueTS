import {IDataType, jjRequest} from "../service";

/**
 * 用户注册
 * 店小二移动端用户注册
 * @param data
 * @return 结果
 */
export const register = (data: any) => {
  return jjRequest.request<IDataType>({
    url: "/system/register",
    method: "post",
    data: data,
  });
};

/**
 * 发送验证码
 * 根据当前银行卡号查询开户行
 * @param 手机号
 * @return 结果
 */
export const smsCode = (data: any) => {
  return jjRequest.request<IDataType>({
    url: `/system/code?telephone=${data}`,
    method: "get",
  });
};

/**
 * 员工登录
 * 店小二移动端用户登录
 * @param 手机号、密码
 * @return jwt
 */
export const login = (data: any) => {
  return jjRequest.request<IDataType>({
    url: "/system/login",
    method: "post",
    data: data,
  });
};
