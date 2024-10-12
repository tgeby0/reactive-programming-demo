import {sendMessage} from "./messages";

document.getElementById("form")!.onsubmit = async (e) => {
    // Prevent the form from refreshing the page
    e.preventDefault();

    // Get the message box's text
    const messageInput: HTMLInputElement = ((e.currentTarget as HTMLFormElement).querySelector('input[name="message"]')!);
    const message = messageInput.value;

    // Send the message
    await sendMessage({data: message, action: "sent", timestamp: new Date()});

    // Clear the message box's input
    messageInput.value = "";

}