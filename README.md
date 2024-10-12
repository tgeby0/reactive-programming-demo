# Reactive Programming Demo

In this tutorial, we are going to build a basic messaging webapp utilizing Javascript's
reactive programming library [rxjs](https://github.com/ReactiveX/rxjs),
websockets using Socket.IO and asynchronous programming.

### Pre-requisites:

To run this tutorial, you will first need to install [Node.js](https://nodejs.org/en).
This is necessary to install the packages needed for this project, as well as to run the web server
that will transmit messages and allow the app to be viewed in your browser.

Once doing so, clone this repository to your computer, cd into the project and run `npm install`
to install the project's dependencies.

Then run `npm run dev` to start up the development server.

You should now be able to view a basic webpage in your browser at http://localhost:3006/.
If you are able to see a mostly blank page with a text box and a "Send" button at the bottom,
everything is working as expected!

### Getting started:

There are a few files already created for you:

- `index.html` - This controls the content that you see in your browser.
  You won't need to make any changes to this file for this tutorial.
- `server/main.ts` - This file controls the web server that allows the
  site to run on your computer.
- `client/main.ts` - This file is currently empty, but it is the starting
  point for the functionality that we are going to be built out.
  Interactive and reactive functions will be placed here in the future.

There are a few other files; however, they aren't relevant to this tutorial.

### Handle a message being sent:

Let's first add an event handler for when a user sends a message