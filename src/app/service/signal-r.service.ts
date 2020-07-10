import { Injectable, Inject } from '@angular/core';
import * as signalR from '@aspnet/signalr';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  message = '';
  constructor(@Inject('BASE_API_URL') private baseUrl: string) {
    this.buildConnection();
    this.startConnection();
  }
  public buildConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl + '/notifyhub')
      .build();
  }

  public startConnection = () => {
    this.hubConnection
    .start()
    .then(() => {
      console.log('Connection Started');
      this.registerSignalEvents();
  })
    .catch (err => {
      console.log('Error Occured: ' + err);
      setTimeout(() => this.startConnection(), 3000);
    });
  }

  public registerSignalEvents = () => {
    this.hubConnection.on('Notify', (data: string) => {
      this.message = data;
    } );
  }
}
