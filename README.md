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

Let's first add an event handler for when a user sends a message. Open `client/main.ts`

Add the following lines to the top of the file:

```typescript
import {fromEvent, map, tap, merge, shareReplay} from "rxjs";

const form = document.getElementById("form")!;
```

This creates a new variable, `form`, which points to the form element on the chat page.
We can now use reactive programming to observe this form and build a collection of data
from every time a message is sent/the form is submitted.

Add this code below the previous line:

```typescript
const userMessages$ = fromEvent<FormDataEvent>(form, 'submit').pipe(
    tap(e => e.preventDefault()),
    // Add additional pipe actions here
);
```

`fromEvent` uses reactive programming to build an array of items from a series of events.
Each time a specified event is triggered (in this case a `FormDataEvent` on `form`), an entry is added to the array.
`pipe` is used to run a pipeline of actions when the desired event is received.

`tap` is used to perform a side effect without modifying the data—in this case we use it to prevent the browser-default
form submission behavior.

Now, we want to get the user's message from the received form event. Add a new action after `tap`:

```typescript
map(e => {
    const messageInput: HTMLInputElement = ((e.currentTarget as HTMLFormElement).querySelector('input[name="message"]')!);
    const message = messageInput.value;
    messageInput.value = "";
    return message;
}),
```

`map` is used to modify data.
This fetches the user's message from the message box and stores it.
It then resets the message box, so that it is ready for another message to be input.
Now, we want to store this in a data object that is more functional.
Add the following line below the previous map:

```typescript
map((message: string): Message => {
    return {data: message, action: "sent", timestamp: new Date()};
}),
```

This takes the previous message string and stores it in a new message object that also contains
whether the message was sent or received, and when it was sent.
This will be useful later when displaying messages in the browser.

Finally, we want to add one last action to the pipe:

```typescript 
shareReplay() 
```

### Display messages in the browser:

Now we want to display the messages a user inputs into the browser, rather than just having them disappear after they
are sent.
Add the following code to `client/main.ts`:

```typescript
userMessages$.subscribe(message => {
    console.log("message", message)
    const newMessage = document.createElement("li");
    newMessage.innerHTML = `
        <div>
            <p class="message-text">${message.data}</p>
            <p class="message-date">${message.action} ${new Date(message.timestamp).toLocaleString()}</p>
        </div>
    `;
    newMessage.classList.add(message.action);
    document.getElementById("messages")!.appendChild(newMessage);
});
```

`subscribe` is used to listen to an observer and perform an action every time it is updated.
In this case, every time a new message is sent, we want to immediately display it in the browser.
Reactive programming makes this action extremely seamless to achieve.

Refresh your browser, you should now be able to input a message and press send,
and it should display at the top of the screen!

However, if you open up this site in a second tab, you'll notice that messages are not passed between the two instances.
What kind of messaging app only lets you send messages to yourself??

### Set up a Websocket

Websockets are used to asynchronously send and receive data between one or more clients and a server.
This allows applications to react to events (such as sending a message) in real-time!




