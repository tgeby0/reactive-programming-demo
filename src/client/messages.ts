import {BehaviorSubject} from "rxjs";

interface Message {
    data: string;
    timestamp: Date;
    action: "sent" | "received";
}

// Create an observer on the array of messages
const messages = new BehaviorSubject([] as Message[]);

// Update the displayed list of messages whenever a new message is sent or received
messages.subscribe(updatedMessages => {
    let content = ``;
    updatedMessages.forEach((message) => {content = content + `<li>${message.data}</li>`});

    document.getElementById("messages")!.innerHTML = content;
})

// Store the inputted message in the message array and then dispatch it to the websocket
export const sendMessage =  async (message: Message): Promise<void> => {
    const current = messages.getValue();
    messages.next([...current, message])

    // TODO: notify websocket of message
}