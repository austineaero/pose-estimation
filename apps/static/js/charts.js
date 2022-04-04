// Declare colors
var color_custom = '#2596be';
var color_custom_1 = '#00cc99';
var color_custom_2 = '#0099ff';
var color_custom_3 = '#9900cc';

// #################################################################### Bar and Line Charts ####################################################################
// Options for the line chart entitled 'Number of gait abnormalities per hour (Today)'
var options_gait_abs_per_hour_today_chart = {
  chart: {
    height: '100%',
    type: 'line'
  },
  series: [
    {
      name: 'Number of gait abnormalities',
      color: color_custom,
      data: [3, 4, 5, 5, 7, 6, 7, 9, 11]
    }
  ],
  xaxis: {
    title: {
      text: 'Hours'
    },
    categories: [12, 13, 14, 15, 16, 17, 18, 19, 20]
  },
  yaxis: {
    title: {
      text: 'Number of persons with a gait abnormality'
    }
  },
  title: {
    text: 'Number of gait abnormalities per hour (Today)',
    floating: true,
    align: 'center',
    style: {
      color: '#444'
    }   
  }
};

// Options for the bar chart entitled 'Number of gait abnormalities per month on this year'
var options_gait_abs_per_month_year_chart = {
  chart: {
    height: '280px',
    type: 'bar'
  },
  series: [
    {
      name: 'Number of gait abnormalities',
      color: color_custom,
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }
  ],
  xaxis: {
    title: {
      text: 'Months'
    },
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  yaxis: {
    title: {
      text: 'Number of persons with a gait abnormality'
    }
  },
  title: {
    text: 'Number of gait abnormalities per month on this year',
    floating: true,
    align: 'center',
    style: {
      color: '#444'
    }   
  }
};

// ####################################################################### Radial Charts #######################################################################
// Options for the first radial chart
var options_rad_1 = {
  series: [20],
  chart: {
    height: 350,
    type: 'radialBar',
  },
  fill: {
    type: 'solid',
    colors: [color_custom_1]
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '70%',
      }
    },
  },
  labels: ['Dayly'],
};

// Options for the second radial chart
var options_rad_2 = {
  series: [45],
  chart: {
    height: 350,
    type: 'radialBar',
  },
  fill: {
    type: 'solid',
    colors: [color_custom_2]
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '70%',
      }
    },
  },
  labels: ['Dayly'],
};

// Options for the third radial chart
var options_rad_3 = {
  series: [35],
  chart: {
    height: 350,
    type: 'radialBar',
  },
  fill: {
    type: 'solid',
    colors: [color_custom_3]
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '70%',
      }
    },
  },
  labels: ['Dayly'],
};

// ######################################################################### Rendering #########################################################################
var chartgait_abs_per_hour_today = new ApexCharts(document.querySelector("#gait-abs-per-hour-today-chart"), options_gait_abs_per_hour_today_chart);
var chart_gait_abs_per_month_year = new ApexCharts(document.querySelector("#gait-abs-per-month-year-chart"), options_gait_abs_per_month_year_chart);

var chart_rad_1 = new ApexCharts(document.querySelector("#radial-chart-1"), options_rad_1);
var chart_rad_2 = new ApexCharts(document.querySelector("#radial-chart-2"), options_rad_2);
var chart_rad_3 = new ApexCharts(document.querySelector("#radial-chart-3"), options_rad_3);

chartgait_abs_per_hour_today.render();
chart_gait_abs_per_month_year.render();

chart_rad_1.render();
chart_rad_2.render();
chart_rad_3.render();
