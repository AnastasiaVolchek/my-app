import { height } from "@mui/system";
import * as echarts from "echarts";
import { useEffect } from "react";

export const Chart = () =>{

    useEffect (()=>{

    const option = {
        title: {
          text: 'Доступное количество товара, шт.'
        },
        tooltip: {},
        xAxis: {
          data: ['Марио', 'Пич', 'Луиджи', 'Тоад', 'Баузер', 'Купа', 'Йоша', 'Растение']
        },
        yAxis: {},
        series: [
          {
            name: 'sales',
            type: 'bar',
            data: [2, 6, 1, 3, 2, 2, 6, 8]
          }
        ]
      }

    const chartDom = document.getElementById("chartsId");
    const myChart = echarts.init(chartDom)

    option && myChart.setOption(option);


      },[])

    return <div>
        <div style={{width: "600px", height: "500px"}} id="chartsId"></div>
    </div>
}