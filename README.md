# liri-node-app

The *liri-node-app* is a command line interface (CLI) application that utilizes various technologies to take user input at the terminal command line and returns the information requested to the user also in the command line.

You can find the application and associated files at:  https://github.com/Bhearre/liri-node-app

The application technologies include the following:
*   Javascript
*   Node.js
*   Node Package Manager (NPM)
*   Inquirer Package from NPM
*   Axios Package from NPM

In addition to the above, the additional technologies include:

*   Node File System(fs) to read and write files as well as child process 
*   Moment.js (for handling dates and times)
*   (AJAX) Asynchous Javascript and Extensible Markup Language (XML) to make calls to various API's
*   Application Programming Interfaces (API's) for"
    *   Spotify
    *   Bands in Town and 
    *   Open Movie Database (OMDB)

Liri.js lets the user give the app commands to get information.  These commands are passed to the app as the third argument in their query which is then followed by either: the name of a Band, a Song or a Movie of interest to them.

Commands take four arguments as follows without the parenthesis or number:  1.(Node) 2.(liri.js) 3.`(command-from-list-below)` 4.(the name of the band, song or movie of interest). The command `do-what-it-says` reads from a file called random.txt and runs the file contents at the command line.

   * `concert-this` 

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

 
The application then makes an AJAX call to the appropriate API and returns a response to the terminal.

My role in developing this application was to take the instructions provided and build out file structure which included the following files:

 The API's used are Spotify, Bands in Town, and OMDB 

*************************************************************************************************


1. Clearly state the problem the app is trying to solve (i.e. what is it doing and why)
2. Give a high-level overview of how the app is organized
3. Give start-to-finish instructions on how to run the app
4. Include screenshots, gifs or videos of the app functioning
5. Contain a link to a deployed version of the app
6. Clearly list the technologies used in the app
7. State your role in the app development
