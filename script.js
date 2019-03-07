// technically works, but for some reason is putting the results on every other
// line instead of every line

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
// fetch data using API called fetch - built in browser API
// fetch returns a promise
// while we know blob should be json, it's actually just raw data
// you need to convert it to json format
fetch(endpoint)
  .then(blob => blob.json()
  // blob.json returns another promise
  // '...' is ES6 for spread: without it you get a nested array
  // where the top level contains only one element- all of data
  .then(data => cities.push(...data)));

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // you can't just put a variable between /these/, you have to
    // create a new RegExp object and pass in the flags you want to use
    // here, those flags are global and insensitive
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  })
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      <li>
      `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
