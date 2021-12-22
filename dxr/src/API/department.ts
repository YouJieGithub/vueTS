import {IDataType, jjRequest} from "../service";

/**
 *  部门列表
 *  查询所有未禁用的部门列表
 * @return list
 */
export const departmentList = (data: any) => {
  return jjRequest.request<IDataType>({
    url: "/department/list",
    method: "get",
  });
};
