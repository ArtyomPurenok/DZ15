
fetch('https://www.nbrb.by/api/exrates/currencies')
  .then((response) => response.json())
    .then(postMessage)