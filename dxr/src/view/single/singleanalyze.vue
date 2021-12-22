<template>
  <HeadBack :title="'详情'"></HeadBack>
  <div class="singleanalyze-sum">
    <p>{{ Info.count }}</p>
    <p>{{ Info.name }}</p>
  </div>
  <div style="background-color: #f7f7ff;">
    <div v-if="parseInt(route.query.flag)===1&&!isBarOption" class="singleanalyze-statistics">
      <p>地区单量统计</p>
      <VEcharts :option="barOption" class="singleanalyze-statistics-echarts" @click="onBarEcharts"></VEcharts>
    </div>
    <div class="singleanalyze-trend">
      <p>地区单量走势</p>
      <VEcharts :option="lineOption" class="singleanalyze-statistics-echarts"></VEcharts>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";

/**
 * orderanalysisInfo   单量信息
 * orderanalysisRegion 地区单量统计
 * orderanalysisTrend  地区单量走势
 */
import {orderanalysisInfo, orderanalysisRegion, orderanalysisTrend} from '@/API/single';
import {onBeforeMount, ref} from "vue";

const router = useRouter();
const route = useRoute();
const barOption = ref<any>({});
const lineOption = ref<any>({});
const isBarOption=ref<boolean>(false)

const Info = ref<Array<object>>({})

const getInfo = (data) => {
  orderanalysisInfo(data).then(res => {
    Info.value = res.data;
  })
};
const fontSize = (val) => {
  return val * (window.innerWidth / window.innerHeight)
};

//柱形图
const getRegion = (data) => {
  orderanalysisRegion(data).then(res => {
    const data = res.data;
    if(data.length===0){
      isBarOption.value=true;
    }else {
      isBarOption.value=false;
    }
    barOption.value = {
      legend: {},
      tooltip: {},
      grid: {
        top: 20,
        left: 40,
        right: 40,
        bottom: 20
      },
      dataset: {
        source: data.map(r => {
          return [r.name, r.count]
        })
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          color: '#999999',
          fontSize: fontSize(20)
        }
      },
      yAxis: {
        axisLabel: {
          color: '#999999',
          fontSize: fontSize(20),
          formatter: function (value, index) {
            if (value > 0) {
              return `${value / 1000}万`;
            } else {
              return value
            }
          }
        },
      },
      series: [{
        type: 'bar', itemStyle: {
          color: '#0089ff',
          borderRadius: [8, 8, 0, 0]
        },
        barWidth: "20%"
      }]
    }
  });
};

//折线图
const getTrend = (data) => {
  orderanalysisTrend(data).then(res => {
    const data = res.data;
    lineOption.value = {
      legend: {},
      tooltip: {},
      grid: {
        top: 20,
        left: 40,
        right: 40,
        bottom: 20
      },
      dataset: {
        source: data.map(r => {
          return [r.name, r.count]
        })
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          color: '#999999',
          fontSize: fontSize(20)
        }
      },
      yAxis: {
        axisLabel: {
          color: '#999999',
          fontSize: fontSize(20),
          formatter: function (value, index) {
            if (value > 0) {
              return `${value / 1000}万`;
            } else {
              return value
            }
          }
        },
      },
      series: {
        type: 'line',
        itemStyle: {
          color: '#0089ff',
          borderRadius: [8, 8, 0, 0]
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: "#0089ff"
            }, {
              offset: 0.5, color: "#80c4ff"
            },
              {
                offset: 1, color: "#ffffff"
              }],
          }
        }
      }
    }
  })
};

//柱形图点击事件
const onBarEcharts=(val)=>{
  let id=val.data[1];
  router.push({path:'/singleanalyze',query:{id,flag:route.query.flag,moth:route.query.moth}})
};

//组件内独享路由
onBeforeRouteUpdate((to,from) => {
  if(to.query.id!==from.query.id){
    let data = {
      dept: to.query.id,
      month: to.query.moth
    }
    getInfo(data);
    getTrend(data);
    if (parseInt(to.query.flag) === 1) {
      getRegion(data);
    }
  }
})

onBeforeMount(() => {
  let data = {
    dept: route.query.id,
    month: route.query.moth
  }
  getInfo(data);
  getTrend(data);
  if (parseInt(route.query.flag) === 1) {
    getRegion(data);
  }
})


</script>

<style lang="scss" scoped>
$fontSizeDefault: 24px;
$fff: #ffffff;
.singleanalyze-sum {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  background: url("src/assets/image/singleanalyzeBG.png") no-repeat center;
  background-size: 100%;
  color: #ffffff;

  p:first-child {
    font-size: 56px;
    font-weight: bolder;
  }

  p:last-child {
    font-size: $fontSizeDefault;
    letter-spacing: 2px;
  }
}

.singleanalyze-statistics {
  margin-bottom: 20px;
  padding-left: 23px;
  padding-top: 30px;
  height: 440px;
  background: $fff;

  p {
    font-size: $fontSizeDefault;
    text-align: left;
  }

  .singleanalyze-statistics-echarts {
    height: 380px;
  }
}

.singleanalyze-trend {
  padding-left: 23px;
  padding-top: 30px;
  height: 474px;
  background: $fff;

  p {
    font-size: $fontSizeDefault;
    text-align: left;
  }

  .singleanalyze-statistics-echarts {
    height: 424px;
  }
}
</style>