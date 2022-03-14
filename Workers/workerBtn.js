const arrCurr = [];
fetch('https://www.nbrb.by/api/exrates/currencies')
.then((response) => response.json())
.then(postMessage)



onmessage = function(workerBtn) {
let sendingArrWorker = {
  msg: 'request',
  datacur: [],
};
//console.log('пришли данные в воркер');

let allPromise = workerBtn.data[0].curID.map((el) => fetch(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${el}?startDate=${workerBtn.data[0].dataStart}&endDate=${workerBtn.data[0].dataEnd}`))
  
Promise.all(allPromise)
  .then((response) => Promise.all(response.map(el => el.json())))
  .then((data) => {
    sendingArrWorker.datacur.push(data)
    sendingArrWorker.datacur = sendingArrWorker.datacur.flat(2).reverse()
    return sendingArrWorker
   })
  .then(postMessage)

     
} 
