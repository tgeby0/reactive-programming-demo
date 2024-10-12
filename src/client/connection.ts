import { Observable, Subject, share } from 'rxjs';
import {io} from 'socket.io-client';

const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

export const serverMessages$ = new Observable(subscriber => {
    socket.on('message', (message) => {
        subscriber.next(message as string);
    });
});

export const sendMessage = (message: string) => {
    socket.emit('message', message);
};