require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require('axios');
var Table = require('cli-table');
var keys = require("./keys.js");
var fs = require('fs');
var moment = require("moment");
var execSync = require("child_process").execSync;

var commandsMap = {
    // command  -------> What to do
    'spotify-this-song': searchSpotify,
    'concert-this': searchBandsInTown,
    'movie-this': searchIMDB,
    'do-what-it-says': doRandom
}

var command = (process.argv[2] || '').toLowerCase()
var query = process.argv[3]

if (!commandsMap[command]) {
    console.error('Sorry, ' + command + ' is not a valid command')
    process.exit(1)
}

commandsMap[command](query)



function searchSpotify(songName) {
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var items = data.tracks.items

        if (items.length === 0) {
            return searchSpotify('The Sign, Ace of Base');
        }

        var table = new Table({
            head: ['Artist Name', 'Song Name', 'Album', 'Preview URL']
        });

        for (var i = 0; i < items.length; i++) {
            var item = items[i] // Current Item we're working with
            var previewURL = item.preview_url
            if (!previewURL) previewURL = 'N/A'
           
            var artistNames = []
            for (var j = 0; j < item.artists.length; j++) {
                artistNames.push(item.artists[j].name);
            }
            table.push(
                [
                    artistNames.join(', '),
                    item.name,
                    item.album.name,
                    previewURL
                ]
            );
        }
        console.log(table.toString());
        fs.writeFileSync('./test.json', JSON.stringify(data, null, 2), 'utf8')
    });
}

function searchBandsInTown(bandName) {
    var url = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
    axios.get(url)
        .then(function (response) {
            var table = new Table({
                head: ['Name of Venue', 'Venue Location', 'Date of Event']
            });

            for (var i = 0; i < response.data.length; i++) {
                var event = response.data[i]
                var location = event.venue.city
                if (event.venue.region) location = location + " " + event.venue.region
                if (event.venue.country) location = location + ", " + event.venue.country
                var startTime = moment(event.datetime).format('MM/DD/YYYY');
                table.push(
                    [
                        event.venue.name,
                        location,
                        startTime
                    ]
                );
            }
            console.log(table.toString());
        })
        .catch(function (error) {
            console.log(error);
        });
}




function searchIMDB(movieName) {


    var titleTable = new Table({
        head: ['Title', 'Year', 'IMDB Rating', "Rotten Tomatoes Rating", 'Country', 'Language', 'Plot', 'Actors']
    });
// ===============================  Code Below Will Use the "Search" Endpoint of the OMDB API and return 10 results. ===========
    // var url = "http://www.omdbapi.com/?s=" + movieName + "&apikey=e4179ba0&page=1&type=movie&Content-Type=application/json";
    // axios.get(url)
    //     .then(function (response) {
    //         var searchMe = response.data.Search;
    //         //console.log("length of search " + searchMe.length);

    //         for (var i = 0; i < searchMe.length; i++) {
    //             searchTable.push(
    //                 [
    //                     searchMe[i].Title,
    //                     searchMe[i].Year                   
    //                 ]
    //             )
    //         } //closes for loop

    //         console.log(searchTable.toString());
    //         //fs.writeFileSync('./searchIMDB.json', JSON.stringify(response.data, null, 2), 'utf8');

    //     //search individual titles

    //    // console.log("this is searchTable " + searchTable);

    //     for (var k = 0; k < searchMe.length; k++) {

    //  var searchTitle = searchMe[k].Title;
    //var searchTitle = searchTable[k].Title;
    //console.log("this is searchTitle " + searchTitle);
// ========================================End code to Search for Multiple titles ======================================

    var url = "http://www.omdbapi.com/?t=" + movieName + "&apikey=e4179ba0";
    axios.get(url)
        .then(function (response) {
            var thisTitle = response.data;
            //console.log("this is in the title search " + thisTitle.Title + " " + thisTitle.imdbRating);
            titleTable.push([
                thisTitle.Title,
                thisTitle.Year,
                thisTitle.imdbRating,
                thisTitle.Ratings[1].Value,
                thisTitle.Country,
                thisTitle.Language,
                thisTitle.Plot,
                thisTitle.Actors
            ])

            console.log(titleTable.toString());    //this works but provides a cumulative table

        }) //closes then function in search each title


}



// Liri Bot fourth API Call Function to read the file random.txt and do what it says.  Presently the function works to return the 
// parameters of the random.txt file to the terminal but the functionality for running at the command line automagically is not yet in place.
function doRandom() {

    console.log('gonna do the random thing');
    var command;
    fs.readFile('./random.txt', 'utf8', function (err, contents) {
        console.log(contents);
        var args = contents.split(",");
        command = args[0];
        var query = args[1];

        switch (command) {
                case 'spotify-this-song':
                    searchSpotify(query)
                    break;
                case 'concert-this':
                    searchBandsInTown(query)
                    break;
                case 'movie-this':
                    searchIMDB(query)
                    break;
               
            }
            
    });
   

    console.log('after calling readFile');


}
   
