import React from "react";
import { Bar } from "react-chartjs-2";
import { LiveTime } from "../../Types";

type Props = {
  resultedData: {
    result: number | string;
    liveTime: LiveTime;
  };
};
export const Result = (props: Props) => {
  const arraysOfliveTimeKeys = Object.keys(props.resultedData.liveTime);
  const arraysOfliveTimeValues = Object.values(props.resultedData.liveTime);
  const data = {
    labels: arraysOfliveTimeKeys,
    datasets: [
      {
        label: "User live time",
        data: arraysOfliveTimeValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "rgb(60, 50, 52)",
        },
      },
      title: {
        display: true,
        text: "Users lifetime",
        color: "#5D6E97",
        padding: {
          top: 20,
          bottom: 10,
        },
        font: {
          family: "Ubuntu",
          size: 15,
        },
      },
    },
    scales: {
      x: {
        title: {
          color: "#5D6D97",
          display: true,
          text: "UserID",
        },
      },
      y: {
        title: {
          color: "#5D6D97",
          display: true,
          text: "Days",
        },
      },
    },
  };

  return (
    <div className="result">
      <p className="result__title">
        Rolling Retention 7 day = {props.resultedData.result} %
      </p>
      <Bar data={data} options={options} />
    </div>
  );
};
