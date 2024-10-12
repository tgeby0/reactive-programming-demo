import {BehaviorSubject} from "rxjs";

// Interface defining a message data type
interface Message {
    data: string;
    timestamp: Date;
    action: "sent" | "received";
}

// Create an observable array of Messages
const messages = new BehaviorSubject([] as Message[]);

// Update the displayed list of messages whenever a new message is sent or received
messages.subscribe(updatedMessages => {
    let content = ``;
    updatedMessages.forEach((message) => {
        content = content +
            `
            <li class="${message.action}">
                <div>
                    <p class="message-text">${message.data}</p>
                    <p class="message-date">${message.action} ${message.timestamp.toLocaleString()}</p>
                </div>
            </li>
            `
    });

    document.getElementById("messages")!.innerHTML = content;
})


// Store the inputted message in the message array and then dispatch it to the websocket
export const sendMessage = async (message: Message): Promise<void> => {
    const current = messages.getValue();
    messages.next([...current, message])

    // TODO: notify websocket of message
}

// Handle a message received from the Websocket
export const onMessage = async (messageText: string): Promise<void> => {
    const current = messages.getValue();
    messages.next([...current, {data: messageText, action: "received", timestamp: new Date()}])
}