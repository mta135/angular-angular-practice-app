// notification.service.ts
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { NotificationPayload } from '../models/notification-payload.model';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private hubConnection: signalR.HubConnection;
    private notificationsSubject = new BehaviorSubject<string[]>([]);
    public notifications$ = this.notificationsSubject.asObservable();

    constructor() {
        // Constructorul doar pregătește conexiunea, nu o pornește
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:5231/emailhub')
            .withAutomaticReconnect()
            .build();

        this.addNotificationListener();
    }

    public async initializeConnection(): Promise<string | null> {

        if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
            console.log('SignalR este deja conectat.');
            return this.hubConnection.connectionId; // Returnează ID-ul existent
        }

        try {

            console.log('Pornire conexiune SignalR...');
            await this.hubConnection.start();
            console.log('Conexiune SignalR stabilită. ID:', this.hubConnection.connectionId);

            return this.hubConnection.connectionId;

        } catch (err) {
            console.error('Eroare la conectarea SignalR: ', err);
            return null; // Returnăm null în caz de eroare
        }
    }
    private addNotificationListener(): void {
        this.hubConnection.on('ReceiveNotification', (user: string, data: NotificationPayload) => {
            debugger;

            console.log(`Primit de la: ${user}`);
            console.log(`Email: ${data.email} | Success: ${data.isSended} | Error: ${data.message}`);

            const currentNotifications = this.notificationsSubject.value;

            const text = data.isSended
                ? `Trimis către ${data.email}`
                : `Eroare către ${data.email}: ${data.message}`;

            this.notificationsSubject.next([...currentNotifications, text]);
        });

        this.hubConnection.onreconnecting((error) => {
            console.warn(`Conexiunea pierdută, reconectare...`, error);
        });

        this.hubConnection.onreconnected((connectionId) => {
            console.log(`Reconectat. ID: ${connectionId}`);
        });
    }

    public stopConnection(): void {
        if (this.hubConnection) {
            this.hubConnection.stop()
                .then(() => console.log('Conexiune SignalR oprită.'))
                .catch(err => console.log('Eroare la oprirea conexiunii SignalR: ' + err));
        }
    }
}