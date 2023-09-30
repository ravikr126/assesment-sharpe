import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.llama.fi/summary/fees/lyra?dataType=dailyFees')
      .then((response) => response.json())
      .then((responseData) => {
        // Assuming responseData.totalDataChart is an array
        setData(responseData.totalDataChart);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      createChart();
    }
  }, [data]);

  const createChart = () => {
    const timestamps = data.map((entry) => entry[0] * 1000); // Convert to milliseconds
    const values = data.map((entry) => entry[1]);

    const ctx = document.getElementById('myChart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: timestamps.map((timestamp) =>
          new Date(timestamp).toLocaleDateString()
        ),
        datasets: [
          {
            label: 'Total Data Chart',
            data: values,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
          },
        },
      },
    });
  };

  return (
    <div>
      <canvas id="myChart" width="400" height="200"></canvas>
    </div>
  );
};

export default ChartComponent;
