import React from 'react'
import { Bar } from 'react-chartjs-2';
import { LiveTime } from '../../Types';


type Props = {
    resultedData: {
        result: number,liveTime: LiveTime  
    }
}
export const Result = (props: Props) => {
    const arraysOfliveTimeKeys  = Object.keys(props.resultedData.liveTime)
    const arraysOfliveTimeValues  = Object.values(props.resultedData.liveTime)
    console.log(arraysOfliveTimeKeys);
const data = {
  labels: arraysOfliveTimeKeys,
  datasets: [{
    label: 'Users live time',
    data: arraysOfliveTimeValues,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
}

const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,      
        }
      }
    },
  };

    return (
        <div className='result'>
            <p className='result__title'>Rolling Retention in 7 days = {props.resultedData.result} %</p>
            <Bar data={data} />
        </div>
    )
}
