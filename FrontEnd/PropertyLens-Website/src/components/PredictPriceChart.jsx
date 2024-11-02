// THIS ISN'T USING IN ANY WHERE YET

// Setup
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const PredictPriceChart = () => {
  // Sample data for practice
  const prices = [120000, 125000, 123000, 130000, 128000]; // Replace with dynamic predictions if available
  const labels = ["1", "2", "3", "4", "5"];

  // Chart data configuration
  const data = {
    labels: labels, // x-axis
    datasets: [
      {
        label: "Bedroom", // Label shown in the tooltip and legend
        data: prices, // y-axis values
        borderColor: "rgb(88, 56, 250)",
        backgroundColor: "rgb(130, 106, 251)",
        fill: true,
        tension: 0.4, // Smoothness of the curve
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Prediction Series",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price ($)",
        },
        beginAtZero: false, // Use if prices are generally above zero
      },
    },
  };

  return (
    <>
      <h2>Predicted Price Over Time</h2>
      <Line data={data} options={options} />
    </>
  );
};
