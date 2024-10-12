export const sentMessages: string[] = [];

export const sendMessage = (message: string): void => {
    sentMessages.push(message);

    // TODO: notify websocket of message
}