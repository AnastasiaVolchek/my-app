import * as echarts from "echarts";
import { useContext, useEffect } from "react";
import "./index.scss"
import { CardContext } from "../../context/cardContext";

export const Chart = () =>{

const {cards} = useContext(CardContext);

const arr = cards.map(item => ({
  name: item?.name,
  value: item?.stock
}));

const sum = arr.reduce((accumulator, current) => accumulator + current.value, 0);

arr.push({
  // make an record to fill the bottom 50%
  value: sum,
  itemStyle: {
    // stop the chart from rendering this piece
    color: 'none',
    decal: {
      symbol: 'none'
    }
  },
  label: {
    show: false
  }
});

console.log(arr);
    useEffect (()=>{
            
      const option = {
        title: {
        text: ''   
            },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center',
          // doesn't perfectly work with our tricks, disable it
          selectedMode: false
        },
        series: [
          {
            name: 'Доступно',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '70%'],
            // adjust the start angle
            startAngle: 180,
            label: {
              show: true,
              formatter(param) {
                // correct the percentage
                return param.name + ' (' + param.value + ' шт.)';
              }
            },
            data: arr
          }
        ]
      };


    const chartDom = document.getElementById("chartsId");
    const myChart = echarts.init(chartDom)

    option && myChart.setOption(option);


      },[])

    return <div>
      <h3 className="chart__name"> Доступное количество товара</h3>
        <div className="chart" id="chartsId"></div>
    </div>
}
// Внутри хука useEffect происходит инициализация графика с помощью библиотеки echarts. 
// В переменной chartDom получаем элемент с id chartsId, куда будет вставлен график. 
// Создаем экземпляр графика myChart с помощью функции init , который привязывается к элементу chartDom.
// Наконец, с помощью метода setOption графику передаются опции из объекта option.