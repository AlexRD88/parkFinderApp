'use strict';

const apiKey = 'TWnyBj99YbKEVOxryg5YxgkIq9ZZsz8y00lMbPAX';
const searchURL = "https://api.nps.gov/api/v1/parks";

//Form Event Listener
$(document).ready(function () {
    watchSubmitForm();
});

//Watch the Submit Form Listeners
function watchSubmitForm() {
    $('#search-form').submit(e => {
        e.preventDefault();
        let searchState = $('#state-name-input').val();
        let numResults = $('#number-input').val();
        getNationalParks(searchState, numResults);
    });
}

//Format search query through Params
function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    );
    return queryItems.join('&');
}

//GET Request to National Parks Service API
function getNationalParks(query, limit = 10) {
    const params = {
        stateCode: query,
        limit,
        api_key: apiKey
    };

    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;

    //Catch error
    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            console.log(err);
            alert("Something went wrong, try again!");
        });
}

//Show the Results
function displayResults(responseJson) {
    $("#js-resultsList").empty();
    for (let i = 1; i < responseJson.data.length; i++) {
        $("#js-resultsList").append(`
        <br> 
        <h3 class="results-title">${[i] + '.' + ' '}${responseJson.data[i].fullName}</h3>
        <div class= "row>
        <h4 class="results-description">${responseJson.data[i].description}</h4>
        <br>
        <br>
        <a href=" ${responseJson.data[i].url}">Visit Park's Website</a>

        `);
    }
    $('#js-resultsList').removeClass('hidden');
}