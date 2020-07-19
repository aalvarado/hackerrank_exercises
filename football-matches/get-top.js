'use strict';

const https = require('https');

const makeUrl = (year = 0, page = 1) => {
  return `https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=${year}&page=${page}`
}

const getMatches = (year, page) => {
  return new Promise((resolve, reject) => {
    https.get(makeUrl(year, page), (response) => {
      let data = '';

      response.on('data', (chunk) => data += chunk);
      response.on('end', () => resolve(data));

      response.on('error', (error) => reject(error));
    })
  })
}

const getTeamMatches = (data = []) => {
  return data.reduce((matches, comp) => {
    matches[comp.team1] || (matches[comp.team1] = 0);
    matches[comp.team1] += 1;

    matches[comp.team2] || (matches[comp.team2] = 0);
    matches[comp.team2] += 1;
    return matches
  }, {})
}

const arrayFromRange = (start, end) =>
  Array.from({ length: (end - start) + 1 }, (_, k) => start + k);

//-------------
const args = process.argv.slice(2);
const year = parseInt(args[0] || 0, 10);
const minWins = parseInt(args[1] || 0, 10);

(async (year, minWins) => {
  try {
    let totalData = [];
    let firstPage = 1; //First page is always 1

    // Get the first page and then the total number of pages
    // we then make a call for each page until total_pages
    const {
      total_pages,
      data
    } = JSON.parse(await getMatches(year, firstPage));

    totalData = [...data]; //data is immutable 

    // Collect the rest of the results from the rest of the pages
    let rest = arrayFromRange(firstPage + 1, total_pages)
      .reduce(async (a, cP) => {
        return [
          ...await a,
          ...JSON.parse(await getMatches(year, cP)).data
        ]
      }, []);

    totalData = [
      ...totalData,
      ...await rest, //We add the rest of the data to totalData
    ];

    // Collect number of matches 
    let result = getTeamMatches(totalData);

    let output = Object.keys(result)
      .sort((a,b) => result[b] - result[a]) // Sort in descending order
      .filter((v) => result[v] >= minWins) // Only keep teams with min wins;

    console.log(output);
  }

  catch(error) {
    console.log(error);
  }

})(year, minWins);
