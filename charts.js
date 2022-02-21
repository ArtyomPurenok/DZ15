let openChartBtn = document.querySelector('.openChartBtn');
let closeChartBtn = document.querySelector('.closeChartBtn');
let arrChartData = [];

google.charts.load('current', {packages: ['corechart', 'line']});

function play() {
    google.charts.setOnLoadCallback(drawBackgroundColor);
}


function drawBackgroundColor() {
      var data = new google.visualization.DataTable();
      data.addColumn('datetime', 'X');
      data.addColumn('number', 'Сurrency Сhart');

      data.addRows(arrChartData);

      var options = {
        hAxis: {
          title: 'Date'
        },
        vAxis: {
          title: 'Сurrency'
        },
        backgroundColor: '#f1f8e9'
      };

      var chart = new google.visualization.LineChart(document.querySelector('.charts'));
      chart.draw(data, options);
    }
    play();
    function receivingData(chartData) {
        arrChartData = [];
        chartData.forEach(el => arrChartData.push([new Date(el.Date), el.Cur_OfficialRate]));
        //console.log(arrChartData);
        play();
    }
    
    openChartBtn.addEventListener('click', function() {
      document.querySelector('.charts').style.display = 'block';
      openChartBtn.style.display = 'none';
      closeChartBtn.style.display = 'inline';

    });
    closeChartBtn.addEventListener('click', function() {
      document.querySelector('.charts').style.display = 'none';
      closeChartBtn.style.display = 'none';
      openChartBtn.style.display = 'inline';
    })