import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useMediaQuery } from 'react-responsive';

const AnalyticChart = (props) => {
  const { times, monthData, success } = props;

  const [category, setCategory] = useState([]);
  const [series, setSeries] = useState();

  const isMobile = useMediaQuery({ maxWidth: 700 });

  const getData = async () => {
    if (times == 'today') {
      let categoryArr = [];
      let seriesArr = [];

      monthData?.length > 0 &&
        monthData.map((e) => {
          categoryArr.push(moment.unix(e.key).format('YYYY-MM-DD'));
          seriesArr.push(e.count);
        });

      setCategory(categoryArr);
      setSeries(seriesArr);
    }
    if (times == 'yesterday') {
      let categoryArr = [];
      let seriesArr = [];

      monthData?.length > 0 &&
        monthData.map((e) => {
          categoryArr.push(moment.unix(e.key).format('YYYY-MM-DD'));
          seriesArr.push(e.count);
        });

      setCategory(categoryArr);
      setSeries(seriesArr);
    }
    if (times == '7d') {
      let categoryArr = [];
      let seriesArr = [];

      monthData?.length > 0 &&
        monthData.map((e) => {
          categoryArr.push(moment.unix(e.key).format('YYYY-MM-DD'));
          seriesArr.push(e.count);
        });

      setCategory(categoryArr);
      setSeries(seriesArr);
    }
    if (times == '28d') {
      let categoryArr = [];
      let seriesArr = [];

      monthData?.length > 0 &&
        monthData.map((e) => {
          categoryArr.push(moment.unix(e.key).format('DD MMM'));
          seriesArr.push(e.count);
        });

      setCategory(categoryArr);
      setSeries(seriesArr);
    }
    if (times == '90d') {
      let categoryArr = [];
      let seriesArr = [];

      monthData?.length > 0 &&
        monthData.map((e) => {
          categoryArr.push(moment.unix(e.key).format('YYYY-MM-DD'));
          seriesArr.push(e.count);
        });

      setCategory(categoryArr);
      setSeries(seriesArr);
    }
    if (times == '24h') {
      let categoryArr = [];
      let seriesArr = [];

      monthData?.length > 0 &&
        monthData.map((e) => {
          categoryArr.push(moment.unix(e.key).format('YYYY-MM-DD'));
          seriesArr.push(e.count);
        });

      setCategory(categoryArr);
      setSeries(seriesArr);
    }
    if (success) {
      let categoryArr = [];
      let seriesArr = [];

      monthData?.length > 0 &&
        monthData.map((e) => {
          categoryArr.push(moment.unix(e.key).format('YYYY-MM-DD'));
          seriesArr.push(e.count);
        });
      let startDate, endDate;

      monthData?.length > 0 &&
        monthData.map((e) => {
          // categoryArr.push(moment.unix(e.key).format('YYYY-MM-DD'));
          if (startDate === undefined || e.key < startDate) startDate = e.key;
          if (endDate === undefined || e.key > endDate) endDate = e.key;
          seriesArr.push(e.count);
        });
      let currentDate = new Date(startDate * 1000);

      while (currentDate <= endDate * 1000) {
        categoryArr.push(new Date(currentDate).toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setCategory(categoryArr);
      setSeries(seriesArr);
    }
  };

  useEffect(() => {
    getData();
  }, [times, monthData]);

  const schema = {
    series: [
      {
        name: 'Candidates',
        data: series
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      xaxis: {
        categories: category,
        labels: {
          rotate: 0,
          hideOverlappingLabels: true // Will display only labels that fit
        },
        tickAmount: isMobile ? 5 : 10
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        }
      },
      fill: {
        type: ['gradient'],
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.0,
          opacityFrom: 0.0,
          opacityTo: 0.0,
          stops: [0, 100]
        }
      }
    }
  };

  return (
    <div>
      <div id="chart">
        {console.log(schema.options, schema.series)}
        <Chart
          options={schema.options}
          series={schema.series}
          type="area"
          height={350}
          width="100%"
        />
      </div>
    </div>
  );
};

export default AnalyticChart;
