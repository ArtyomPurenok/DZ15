const inpDateStart = document.querySelector('.inp1');
const inpDateEnd = document.querySelector('.inp2');
const divSelect = document.querySelector('.divSelect');
const currencyList = document.querySelector('.currency');
const tabl = document.querySelector('.tabl');
const week = document.querySelector('.week');
const month = document.querySelector('.month');
const year = document.querySelector('.year');
const currencyNameInTabl = document.querySelector('.currencyNameInTabl');


                      //массив с валютами / Объект с выбранной валютой
let currencyArr = [];
let objToSearch;
                           //поиск действующих валют на период
const myWorker = new Worker('Workers/workerCurrencies.js');
  myWorker.addEventListener('message', function({data}) {
    let workerData = data.filter((el) => Number(el.Cur_DateEnd.slice(0,4)) >= 2022);
    workerData.forEach((el) => currencyArr.push(el));
    addCurrency()
  });


                              //добавление валют в select
function addCurrency() {
  for (let i = 0; i < currencyArr.length - 1; i++) {
      currencyList.innerHTML += `<option name"${currencyArr[i].Cur_ID}">${currencyArr[i].Cur_Name}</option>`
  }
  objToSearch = currencyArr[11];
  dataBtn(arrWorkerBtn);
}


                                                          //Выбор валюты в select


divSelect.addEventListener('change', function (event) {
    tabl.innerHTML = "";
    objToSearch = "";
    objToSearch = currencyArr.find(el => el.Cur_Name === event.target.value);
    arrWorkerBtn.curID = objToSearch.Cur_ID;
    dataBtn(arrWorkerBtn);
    // if (inpDateStart.value && inpDateEnd.value) {
    //   dataBtn();
    // }
    console.log(objToSearch);
    if (tabl.innerHTML == "") {
      ChartData([0, 0]);
    }
})

                                                 //Seach to input
inpDateStart.addEventListener('change', inputDataInWorkerTwo)
inpDateEnd.addEventListener('change', inputDataInWorkerTwo)


function inputDataInWorkerTwo() {
  if (inpDateStart.value && inpDateEnd.value) {
    arrWorkerBtn.dataStart = inpDateStart.value;
    arrWorkerBtn.dataEnd = inpDateEnd.value;
    dataBtn(arrWorkerBtn);
    console.log(arrWorkerBtn);
  }
}


function valueInInput(data) {   
  if (data.length > 1) {
    inpDateStart.value = data[data.length -1].Date.slice(0, 10);
    inpDateEnd.value = data[0].Date.slice(0, 10);
  } else {
    inpDateStart.value = "";
    inpDateEnd.value = "";
  }
}


                                                     //Воркер для поиска по параметрам
let workerBtn = new Worker('Workers/workerBtn.js');

let arrWorkerBtn = {
  curID: 431,
  dataStart: dayjs().add(-6, 'day').format('YYYY-MM-DD'),
  dataEnd: dayjs().format('YYYY-MM-DD'),
}

function dataBtn(dataFile) {
  if (objToSearch) {
    workerBtn.postMessage([dataFile]);
    console.log('push in worker2');
   };
};

                                               //кнопки отображения (неделя/месяц/год)

week.addEventListener('click', function() {
  arrWorkerBtn.dataStart = dayjs().add(-6, 'day').format('YYYY-MM-DD');
  arrWorkerBtn.dataEnd = dayjs().format('YYYY-MM-DD');
  dataBtn(arrWorkerBtn);
})

month.addEventListener('click', function() {
  arrWorkerBtn.dataStart = dayjs().add(-1, 'month').format('YYYY-MM-DD');
  arrWorkerBtn.dataEnd = dayjs().format('YYYY-MM-DD');
  dataBtn(arrWorkerBtn);
})

year.addEventListener('click', function() {
  arrWorkerBtn.dataStart = dayjs().add(-1, 'year').format('YYYY-MM-DD');
  arrWorkerBtn.dataEnd = dayjs().format('YYYY-MM-DD');
  dataBtn(arrWorkerBtn);
})


                                           //Данные из воркера
  workerBtn.onmessage = function({data}) {
    valueInInput(data);
    ChartData(data)
    // console.log(data);
    tabl.innerHTML = "";
    currencyNameInTabl.innerHTML = objToSearch.Cur_Name;
       for (let i = 0; i <= data.length-1; i++) {
         tabl.innerHTML += `<tr> <td>Дата: ${data[i].Date.slice(0,10)}</td> <td>Курс: ${data[i].Cur_OfficialRate}</td> </tr>`
       }
  };
