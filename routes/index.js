var express = require('express');
var router = express.Router();

const axios = require('axios');

/* GEt. */
router.get('/', function (req, res, next) {

  // Here we formulate the date needed for the fetch request
  let today = new Date();
  let todayFormatted = dateFormat(today);
  var priorDate = new Date(new Date().setDate(today.getDate() - 30));
  let priorDateFormatted = dateFormat(priorDate);

  // Here we call the fetch function (getRepos) and use .then to work with the data and send back a response
  // We use .then to make sure that the asynchronous function returns before we do anything
  getRepos(priorDateFormatted).then((response) => {
    
    let listOfLanguages = [];
    let listOfReposPerLanguage = [];
    // Here we get the language of each repository and push them in a signle array to work with
    response.items.forEach((repository, index) => {
      listOfLanguages.push(repository.language);
    });
    // Here we filter the ARRAY of languages through the distinct function created below 
    let distinctLanguages = listOfLanguages.filter(distinct);

    // Here we construct the object that we will return with the following form: 
    // {
    //  'language' : String (language name),
    //  'occurrences': Number (number of occurrences of the language)
    //  'repositories': Array (Repositories that use the language)
    // }
    distinctLanguages.forEach((language => {
      listOfReposPerLanguage.push({ 'language': language, 'occurrences': 0, 'repositories': [] })
    }));

    // Here we populate the listOfReposPerLanguage's values, by scanning the list of repositories, 
    // counting the languages and pushing the repositories
    response.items.forEach((repository => {
      listOfReposPerLanguage.find((value, index) => {
        if (value.language === repository.language){
          value.repositories.push(repository);
          value.occurrences++;
        }
      })
    }))

    // Here we formulate our response
    res.status(200).json({
      endDate: todayFormatted,
      startDate: priorDateFormatted,
      result: listOfReposPerLanguage,
    });
  });

});

// Asynchronous function that FETCHES the list of 100 (per_page), trending (sort=stars), repositories in descending order from the last 30 days (date)
// This function RETURNS an object containing the response of the axios fetch

async function getRepos(date) {
  return await axios.get(`https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&per_page=100`)
    .then(({ data }) => { return data; });
}

// Here we format a Date() object to be in the format: YYYY-MM-DD
function dateFormat(date) {
  return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate();
}

// This function RETURNS an ARRAY of distinct values from the array it's used in
const distinct = (value, index, self) => {
  return self.indexOf(value) === index;
}

module.exports = router;
