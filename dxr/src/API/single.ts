import {IDataType, jjRequest} from "../service";

/**
 * 单量分析
 * 描述：统计各个部门月度单量
 * @param  time
 * @return list
 */
export const orderanalysis = (time: any) => {
  return jjRequest.request<IDataType>({
    url: "orderanalysis/list",
    method: "post",
    data: time,
  });
};

/**
 * 单量信息
 * 描述：单量详情页面头部数据
 * @param  data:{"dept":1,     //部门
                "month":"2021-10"   //月份}
 * @return list
 */
export const orderanalysisInfo = (data: any) => {
  return jjRequest.request<IDataType>({
    url: "orderanalysis/info",
    method: "post",
    data: data,
  });
};

/**
 * 地区单量统计
 * 描述：分地区统计单量
 * @param  data:{"dept":1,     //部门
                "month":"2021-10"   //月份}
 * @return list
 */
export const orderanalysisRegion = (data: any) => {
  return jjRequest.request<IDataType>({
    url: "orderanalysis/region",
    method: "post",
    data: data,
  });
};

/**
 * 地区单量走势
 * 描述：日纬度统计地区单量走势数据
 * @param  data:{"dept":1,     //部门
                "month":"2021-10"   //月份}
 * @return list
 */
export const orderanalysisTrend = (data: any) => {
  return jjRequest.request<IDataType>({
    url: "orderanalysis/trend",
    method: "post",
    data: data,
  });
};
