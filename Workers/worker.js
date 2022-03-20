const arrCurr = [];
fetch('https://www.nbrb.by/api/exrates/currencies')
.then((response) => response.json())
.then(postMessage)



onmessage = function(inp_Obj_To_Worker) {
let sendingArrWorker = {
  msg: 'request',
  datacur: [],
};
//console.log('пришли данные в воркер');

let allPromise = inp_Obj_To_Worker.data[0].curID.map((el) => fetch(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${el}?startDate=${inp_Obj_To_Worker.data[0].dataStart}&endDate=${inp_Obj_To_Worker.data[0].dataEnd}`))
  
Promise.all(allPromise)
  .then((response) => Promise.all(response.map(el => el.json())))
  .then((data) => {
    console.log(data)
    sendingArrWorker.datacur.push(data)
    sendingArrWorker.datacur = sendingArrWorker.datacur.flat(2).reverse()
    return sendingArrWorker
   })
  .then(postMessage)

     
} 
