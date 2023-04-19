import * as echarts from "echarts";
import { useEffect } from "react";

export const Chart = () =>{

    useEffect (()=>{


     const option = {
        title: {
              text: 'Доступное количество товара, шт.'
            },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Количество, доступное для заказа',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 2, name: "Марио"},
              { value: 6, name: 'Пич' },
              { value: 1, name: 'Луиджи' },
              { value: 3, name: 'Тоад' },
              { value: 2, name: 'Баузер' },
              { value: 2, name: 'Купа' },
              { value: 8, name: 'Растение' },
              { value: 6, name: 'Йоша' }
            ]
          }
        ]
      };

    const chartDom = document.getElementById("chartsId");
    const myChart = echarts.init(chartDom)

    option && myChart.setOption(option);


      },[])

    return <div>
        <div style={{width: "600px", height: "500px"}} id="chartsId"></div>
    </div>
}
// Внутри хука useEffect происходит инициализация графика с помощью библиотеки echarts. 
// В переменной chartDom получаем элемент с id chartsId, куда будет вставлен график. 
// Создаем экземпляр графика myChart с помощью функции init , который привязывается к элементу chartDom.
// Наконец, с помощью метода setOption графику передаются опции из объекта option.