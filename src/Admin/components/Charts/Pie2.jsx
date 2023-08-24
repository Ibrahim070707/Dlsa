import React from 'react'
import Chart from 'react-apexcharts';

function Pie({ Data, Width }) {
  const PieChartDataa = {
    series: [Data.Connect, Data.Quote, Data.Convience, Data.Appointment, Data.Convert, Data.Lost],
    options: {
      chart: {
        type: 'pie',
      },
      labels: ['Connect', 'Quote', 'Convience', 'Appointment', 'Convert', "Lost"],
    },
  };
  return (
    <div>
      <Chart options={PieChartDataa.options} series={PieChartDataa.series} type="pie" width={Width} />
    </div>
  )
}

export default Pie