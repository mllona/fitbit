var stepsLast1m = {
  "activities-steps": [
    {
      "dateTime": "2012-12-21",
      "value": "93"
    },
    {
      "dateTime": "2012-12-22",
      "value": "4385"
    },
    {
      "dateTime": "2012-12-23",
      "value": "13017"
    },
    {
      "dateTime": "2012-12-24",
      "value": "6387"
    },
    {
      "dateTime": "2012-12-25",
      "value": "44"
    },
    {
      "dateTime": "2012-12-26",
      "value": "0"
    },
    {
      "dateTime": "2012-12-27",
      "value": "0"
    },
    {
      "dateTime": "2012-12-28",
      "value": "0"
    },
    {
      "dateTime": "2012-12-29",
      "value": "0"
    },
    {
      "dateTime": "2012-12-30",
      "value": "0"
    },
    {
      "dateTime": "2012-12-31",
      "value": "0"
    },
    {
      "dateTime": "2013-01-01",
      "value": "0"
    },
    {
      "dateTime": "2013-01-02",
      "value": "1551"
    },
    {
      "dateTime": "2013-01-03",
      "value": "9029"
    },
    {
      "dateTime": "2013-01-04",
      "value": "5657"
    },
    {
      "dateTime": "2013-01-05",
      "value": "14670"
    },
    {
      "dateTime": "2013-01-06",
      "value": "3522"
    },
    {
      "dateTime": "2013-01-07",
      "value": "7333"
    },
    {
      "dateTime": "2013-01-08",
      "value": "7923"
    },
    {
      "dateTime": "2013-01-09",
      "value": "13288"
    },
    {
      "dateTime": "2013-01-10",
      "value": "5764"
    },
    {
      "dateTime": "2013-01-11",
      "value": "15465"
    },
    {
      "dateTime": "2013-01-12",
      "value": "8105"
    },
    {
      "dateTime": "2013-01-13",
      "value": "6076"
    },
    {
      "dateTime": "2013-01-14",
      "value": "11096"
    },
    {
      "dateTime": "2013-01-15",
      "value": "5325"
    },
    {
      "dateTime": "2013-01-16",
      "value": "13774"
    },
    {
      "dateTime": "2013-01-17",
      "value": "3543"
    },
    {
      "dateTime": "2013-01-18",
      "value": "9066"
    },
    {
      "dateTime": "2013-01-19",
      "value": "7763"
    },
    {
      "dateTime": "2013-01-20",
      "value": "77"
    }
  ]
};

var sleepLast1m = {
  "sleep-minutesAsleep":  [
     {
      "dateTime": "2012-12-21",
      "value": "562"
    },
     {
      "dateTime": "2012-12-22",
      "value": "0"
    },
     {
      "dateTime": "2012-12-23",
      "value": "483"
    },
     {
      "dateTime": "2012-12-24",
      "value": "0"
    },
     {
      "dateTime": "2012-12-25",
      "value": "0"
    },
     {
      "dateTime": "2012-12-26",
      "value": "0"
    },
     {
      "dateTime": "2012-12-27",
      "value": "0"
    },
     {
      "dateTime": "2012-12-28",
      "value": "0"
    },
     {
      "dateTime": "2012-12-29",
      "value": "0"
    },
     {
      "dateTime": "2012-12-30",
      "value": "0"
    },
     {
      "dateTime": "2012-12-31",
      "value": "0"
    },
     {
      "dateTime": "2013-01-01",
      "value": "0"
    },
     {
      "dateTime": "2013-01-02",
      "value": "0"
    },
     {
      "dateTime": "2013-01-03",
      "value": "0"
    },
     {
      "dateTime": "2013-01-04",
      "value": "603"
    },
     {
      "dateTime": "2013-01-05",
      "value": "510"
    },
     {
      "dateTime": "2013-01-06",
      "value": "465"
    },
     {
      "dateTime": "2013-01-07",
      "value": "0"
    },
     {
      "dateTime": "2013-01-08",
      "value": "579"
    },
     {
      "dateTime": "2013-01-09",
      "value": "419"
    },
     {
      "dateTime": "2013-01-10",
      "value": "439"
    },
     {
      "dateTime": "2013-01-11",
      "value": "528"
    },
     {
      "dateTime": "2013-01-12",
      "value": "510"
    },
     {
      "dateTime": "2013-01-13",
      "value": "463"
    },
     {
      "dateTime": "2013-01-14",
      "value": "467"
    },
     {
      "dateTime": "2013-01-15",
      "value": "465"
    },
     {
      "dateTime": "2013-01-16",
      "value": "508"
    },
     {
      "dateTime": "2013-01-17",
      "value": "447"
    },
     {
      "dateTime": "2013-01-18",
      "value": "471"
    },
     {
      "dateTime": "2013-01-19",
      "value": "479"
    },
     {
      "dateTime": "2013-01-20",
      "value": "497"
    }
  ]
};

stepsLast1m = _.map(stepsLast1m["activities-steps"], function(item) {
  return [new Date(item.dateTime).getTime(), parseInt(item.value, 10)];
});

sleepLast1m = _.map(sleepLast1m["sleep-minutesAsleep"], function(item) {
  return [new Date(item.dateTime).getTime(), parseInt(item.value,10) * 15];
});

function getAverageSet(dataset) {
  var total = 0;
  var nonzero = 0;
  _.each(dataset, function(item) {
    total += item[1];
    if (item[1] > 0) nonzero++;
  });
  var average = total/nonzero;
  return _.map(dataset, function(item) {
    return [item[0], average];
  });
}

function stripZeros(dataset) {
  return _.map(dataset, function(item) {
    if (item[1] > 0) return item;
  });
}


$(function () {
    var chart;
    $(document).ready(function() {
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'column',
                zoomType: 'x',
                marginRight: 130,
                marginBottom: 25
            },
            title: {
                text: 'Stats for Last 30 Days',
                x: -20 //center
            },
            subtitle: {
                text: 'Source: fitbit.com',
                x: -20
            },
            xAxis: {
                type: 'datetime',
                // maxZoom: 14 * 24 * 3600000, // fourteen days
                title: {
                    text: null
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -10,
                y: 100,
                borderWidth: 0
            },
            series: [
              {name: 'steps', data: stepsLast1m},
              {name: 'sleep', data: sleepLast1m},
              // {name: 'avg sleep', data: getAverageSet(sleepLast1m)},
              // {name: 'avg steps', data: getAverageSet(stepsLast1m)},
              {name: 'sleep reg', data: fitData(stripZeros(sleepLast1m)).data},
              {name: 'step reg', data: fitData(stripZeros(stepsLast1m)).data}
            ]
        });
    });

});