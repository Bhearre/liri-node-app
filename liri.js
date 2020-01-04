require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require('axios');
var Table = require('cli-table');
var keys = require("./keys.js");
var fs = require('fs');
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

// ------------------ The more straight forward way ---------------------

// var validCommands = ['spotify-this-song', 'concert-this', 'movie-this', 'do-what-it-says']
// if (!validCommands.includes(command)) {
//     console.error('Sorry, ' + command + ' is not a valid command')
//     process.exit(1)
// }

// switch (command) {
//     case 'spotify-this-song':
//         searchSpotify(query)
//         break;
//     case 'concert-this':
//         searchBandsInTown(query)
//         break;
//     case 'movie-this':
//         searchOMDB(query)
//         break;
//     case 'do-what-it-says':
//         doRandom()
//         break;
// }


// ------------------ END - The more straight forward way - END ---------------------
// Artist Name
// Song Name
// Preview link of song
// Album name

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
            // var artistNames = item.artists
            //     .map(artist => artist.name)
            //     .filter(artistName => artistName !== 'Doug')
            //     .join(', ')
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
                table.push(
                    [
                        event.venue.name,
                        location,
                        (new Date(event.datetime)).toLocaleDateString()
                    ]
                );
            }
            console.log(table.toString());
            console.log(JSON.stringify(response.data, null, 4));
        })
        .catch(function (error) {
            console.log(error);
        });
}


// ======================= Draft for loop to concatenate the individual words in a multi word movie name=====================

// var nodeArgs = process.argv;

// var movieName = " ";

//     for (i=2; i < nodeArgs.length; i++) {

//     movieName = movieName + " " + nodeArgs[i];
//     }
// console.log(movieName);
// ======================================================================================================================








function searchIMDB(movieName) {
  
  
    // var searchTable = new Table({
    //     head: ['Title', 'Year']
    // });

    var titleTable = new Table({
        head: ['Title', 'Year', 'IMDB Rating', "Rotten Tomatoes Rating", 'Country', 'Language', 'Plot', 'Actors']
    });
  
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

            var url = "http://www.omdbapi.com/?t=" + movieName + "&apikey=e4179ba0";
            axios.get(url)
            .then(function (response) {
                var thisTitle = response.data;
                //console.log("this is in the title search " + thisTitle.Title + " " + thisTitle.imdbRating);
                titleTable.push ( [
                    thisTitle.Title,
                    thisTitle.Year,
                    thisTitle.imdbRating,
                    'NA',
                    thisTitle.Country,
                    thisTitle.Language,
                    thisTitle.Plot,
                    thisTitle.Actors                  
                ] )
               
                console.log(titleTable.toString());    //this works but provides a cumulative table

            }) //closes then function in search each title

            //console.log(titleTable.toString());

                //fs.writeFileSync('./titleIMDB.json', JSON.stringify(response.data, null, 2), 'utf8');

        //} //closes for loop

        //console.log(titleTable.toString());
       //console.log("this is titleTable " + titleTable[1]);


   // }) //closes search then function
    //console.log("this is titleTable 2" + titleTable);

} 


// ===========================Function to search a single movie title by movie name  ===================================

            //  var url = "http://www.omdbapi.com/?t=" + movieName + "&apikey=e4179ba0";
            //  axios.get(url)
            //  .then(function (response) {
            //     var titles = response.data;
     
            //     var titleTable = new Table({
            //         head: ['Title', 'Year', 'IMDB Rating', "Rotten Tomatoes Rating", 'Country', 'Language', 'Plot', 'Actors']
            //     });
            //         titleTable.push(
            //        [
            //         titles.Title,
            //         titles.Year,
            //         titles.imdbRating,

            //     'NA',
            //         titles.Country,
            //         titles.Language,
            //         titles.Plot,
            //         titles.Actors                  
            //         ]
            //    )


            //    console.log(titleTable.toString());

            // for (var i = 0; i < searchMe.length; i++) {
            //     titles.push(searchMe[i].Title);
            //     titles.push(searchMe[i].Year);
            //     titles.push(searchMe[i].imdbRating);
            //     titles.push(searchMe[i].Country);
            //     titles.push(searchMe[i].Language);
            //     titles.push(searchMe[i].Plot);                  


            //console.log(table);

            //fs.writeFileSync('./titleIMDB.json', JSON.stringify(response.data, null, 2), 'utf8');

// ===================================    End of Function for Singe Movie Search  ========================================
            
            // console.log('movie name is', movieName)


            
  
//closes searchIMDB function

          // if (titles.length === 0) {
            //     return searchSpotify('The Sign, Ace of Base');
            // }
    //search for up to 10 titles
        //      var searchTable = new Table({
        //          head: ['Title', 'Year', 'IMDB Rating', "Rotten Tomatoes Rating", 'Country', 'Language', 'Plot', 'Actors']
        //      });

        //      for (var i = 0; i < searchMe.length; i++) {
        //             searchTable.push(
        //            [
        //             searchMe[i].Title,
        //             searchMe[i].Year,                   
        //             ]
        //        )
        //     }
        //     console.log(searchTable.toString());
        //     fs.writeFileSync('./searchIMDB.json', JSON.stringify(response.data, null, 2), 'utf8')

        // }) //closes then function

function doRandom() {
    
    console.log('gonna do the random thing');
    var command;
    fs.readFile('./random.txt', 'utf8', function(err, contents) {
        console.log(contents);
        var args = contents.split(",");
        command = "node liri.js " + args[0] + " " + args[1];
        console.log(command);

       
        
        

    });
    // execSync(command);
    console.log('after calling readFile');


}


    // fs.readFile('/random.txt', 'utf8');
    
    //     if (err) {
    //       console.error(err)
    //       return
    //     }

    //     console.log(data)
    // };   
                
    //     // fs.readFileSync('./random.txt', (err, data) => {
    //     //     if (err) throw err;
    //     //     console.log("we are in the read file" + data);
    //     //   });
    
