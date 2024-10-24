import {fromEvent, map, tap, merge, shareReplay} from "rxjs";
import { sendMessage } from "./connection"; 
import {serverMessages$} from "./connection";

const form = document.getElementById("form")!;
const submitEvents$ = fromEvent<FormDataEvent>(form, 'submit');

const userMessages$ = submitEvents$.pipe(
    tap((e: Event) => {e.preventDefault()}),
    map((e: Event) => {
        const messageInput: HTMLInputElement = ((e.currentTarget as HTMLFormElement).querySelector('input[name="message"]')!);
        const message = messageInput.value;
        messageInput.value = ""; /*Note: this is a side-effect!*/
        return message;
    }),
    //tap(x => console.log(x)),
    map((message: string): Message => {
        return {data: message, action: "sent", timestamp: new Date()};
    }),
    shareReplay(),
)

userMessages$.subscribe(message => {
    console.log("message", message)
    sendMessage(message);
});

const messages$ = merge(userMessages$, serverMessages$);

messages$.subscribe(message => {
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

