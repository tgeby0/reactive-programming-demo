import { fromEvent, map, tap, merge, shareReplay, Subject, connectable } from "rxjs";
import { serverMessages$, sendMessage } from "./connection";

const form = document.getElementById("form")!;

const userMessages$ = fromEvent<FormDataEvent>(form, 'submit').pipe(
    tap(e => e.preventDefault()),
    map(e => {
        const messageInput: HTMLInputElement = ((e.currentTarget as HTMLFormElement).querySelector('input[name="message"]')!);
        const message = messageInput.value;
        messageInput.value = "";
        return message;
    }),
    shareReplay()
);

// const userMessages$ = connectable(formSubmit$, { connector: () => new Subject() });
// userMessages$.connect();

const messages$ = merge(userMessages$, serverMessages$);

userMessages$.subscribe(message => {
    console.log("sending message", message);
    sendMessage(message);
});

userMessages$.subscribe(message => {
    console.log("message", message)
    const newMessage = document.createElement("li");
    newMessage.innerHTML = `
        <div>
            <p class="message-text">${message}</p>
            <p class="message-date">sent ${new Date().toLocaleString()}</p>
        </div>
    `;
    //newMessage.classList.add("sent");
    document.getElementById("messages")!.appendChild(newMessage);
});