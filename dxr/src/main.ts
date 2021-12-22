import { createApp } from "vue";
import App from "./App.vue";
import store, { key } from "./store/index";
import router from "./router/index";
import "amfe-flexible";
import "@/assets/css/index.css"; //公共样式
import "vant/lib/index.css"; //vant样式
// import "@/assets/vantBase/index.css";    //vant 基础变量自定义样式
import VueECharts from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart, LineChart } from "echarts/charts";
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { Notify } from "vant";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

use([
  BarChart,
  LineChart,
  CanvasRenderer,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  DatasetComponent,
]);
dayjs.locale("zh-cn");

createApp(App)
  .use(router)
  .use(store, key)
  .use(Notify)
  .component("v-chart", VueECharts)
  .mount("#app");
