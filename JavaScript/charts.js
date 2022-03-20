let openChartBtn = document.querySelector('.openChartBtn');
let closeChartBtn = document.querySelector('.closeChartBtn');
let arrChartData = [];

google.charts.load('current', {packages: ['corechart', 'line']});

function play() {
    google.charts.setOnLoadCallback(drawBackgroundColor);
}

function drawBackgroundColor() {
      const data = new google.visualization.DataTable();
      data.addColumn('datetime', 'X');
      data.addColumn('number', 'Сurrency');

      data.addRows(arrChartData);

      const options = {
        hAxis: {
          title: 'Date'
        },
        vAxis: {
          title: 'Сurrency'
        },
        backgroundColor: 'f0f8ff',
        width: 750,
        height: 340,
      };

      const chart = new google.visualization.LineChart(document.querySelector('.charts'));
      chart.draw(data, options);
    }
    


    function ChartData(chartData) {
        arrChartData = [];
        chartData.forEach(el => arrChartData.push([new Date(el.Date), el.Cur_OfficialRate]));
        //console.log(arrChartData);
        play();
    }
    

    openChartBtn.addEventListener('click', function() {
      play();
      document.querySelector('.charts').style.display = 'block';
      openChartBtn.style.display = 'none';
      closeChartBtn.style.display = 'inline';
    });
    closeChartBtn.addEventListener('click', function() {
      document.querySelector('.charts').style.display = 'none';
      closeChartBtn.style.display = 'none';
      openChartBtn.style.display = 'inline';
    })