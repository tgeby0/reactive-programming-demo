import { Observable, Subject, share } from 'rxjs';
import {io} from 'socket.io-client';

export const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

export const serverMessages$ = new Subject<string>();

socket.on('message', (message) => {
    console.log('Received message:', message);  
    serverMessages$.next(message as string);
});

export const sendMessage = (message: string) => {
    socket.emit('message', message);
};