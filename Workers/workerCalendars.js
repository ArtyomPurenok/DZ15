onmessage = function(dataOnCalendars) {
    console.log('data came');

    fetch(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/${dataOnCalendars.data[0]}?startDate=${dataOnCalendars.data[1]}&endDate=${dataOnCalendars.data[2]}`)
        .then((response) => response.json())
        .then(postMessage)

  }


