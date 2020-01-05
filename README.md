# liri-node-app

## Summary:

The *liri-node-app* is a command line interface (CLI) application that utilizes various technologies to take user input at the terminal command line and returns the information requested to the user also in the command line.

## Application Location:

You can find the application and associated files at:  https://github.com/Bhearre/liri-node-app

## Technologies Used:

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

## How the Application Works:

Liri.js lets the user give the app commands to get information.  These commands are passed to the app as the third argument of the query which is then followed by either: the Name of a Band, a Song or a Movie of interest to them.

## Command Syntax for Use:

Commands take four arguments as follows without the parenthesis or number:  1.(Node) 2.(liri.js) 3.`(command-from-list-below)` 4.(the name of the band, song or movie of interest). ***Note: Quotations Marks should be used for item 4! ***  

   1. `concert-this` 

   2. `spotify-this-song`

   3. `movie-this`

   4. `do-what-it-says`

The command `do-what-it-says` reads from a file called random.txt and runs the file contents at the command line. 

## The Inner Working of the Application (Simplified)
The application then makes an AJAX call to the appropriate API and returns a response to the terminal.

## The Developer's Role in the Application:
My role in developing this application was to take the instructions provided and build out file structure which included the following files:

## The Resources Used to Deliver Results

 The API's used are Spotify, Bands in Town, and OMDB 

## Seeing the Application Doing its Thing:

### 1. Concert This

The Liri App provides uses the `concert-this` command to give you with information about your favorite bands upcoming concert schedule and here you can see it
bring you information about the current Eagles tour:

https://drive.google.com/file/d/1wlBHctWwMpW-lPYF0UKme-j2w-6XRMxN/view

### 2. Spotify This Song

 You can see the App `spotify-this-song` as it searches Spotify for "Moon River" by following this link:

 https://drive.google.com/open?id=17Sb_49lqjCx4HpBrtLeuZKwSVVE9ZR6V

 or perhaps the a little larger version:

 https://drive.google.com/file/d/1rKqKXC8Q5JEabdlXK8R7ca2rWgE9lQ9p/view

To see a screen shot of the output of the above search for the song "Moon River" follow this link.

https://docs.google.com/presentation/d/1aYXNt95nB068jN7CwWIrTixsDehpDLTi8tp0mXOcv9I/edit?usp=sharing

### 3. Movie This (Find information about a Movie)

You can see the App using the `movie-this` command to search the OMDB API for the movie "Gone With The Wind" here":

https://drive.google.com/file/d/14RbpbSrPg-NBiG_qq1uuKLNGp7j4gNn7/view

Now you can see the App searching the Bands in Town API to find out if the band Eagles is on tour:

https://drive.google.com/file/d/1wlBHctWwMpW-lPYF0UKme-j2w-6XRMxN/view

### 4. Do What It Says

The fourth command in the application reads the contents of a previously saved text file called random.txt using the file system functionality of node.js and 
implements the command `do-what-it-says` which is comma separated string that contains the command and the target search element whish will be either a Band, Song or Movie.  You can see it action here:

When the random.txt file contains the command / string combination: movie-this,"Cast Away" you get the follow result:

https://drive.google.com/file/d/1BFViRijkTQV1Km-HwiGxK1BdYNOTj_j1/view

When the random.txt file contains the command / string combination concert-this,Bob James you get the following results:
Note: As the text file is already text using quotes will throw and error.

https://drive.google.com/file/d/1-E4hIFOaj_EDPmwfg056gHsoMLnELx7-/view


When the random.txt file contains the command / sting combination: spotify-this,Can't Stop The Feeling you will get the following results:


https://drive.google.com/file/d/159HM-cl3CvIeMrz1YTzS4-AVnbuFIXWm/view


If you have questions or comments you may reach the developer at George@FergusonDevelopmentGroup.com

*************************************************************************************************

