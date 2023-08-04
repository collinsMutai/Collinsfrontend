import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMessage } from './IMessage';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const EMAIL_SERVER_URL = environment.SERVER_URL;

@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor(private http: HttpClient) {}

  getMessage(name: string, email: string, message: string): Observable<{message: string}> {
    const messageData: IMessage = {
      name: name,
      email: email,
      message: message,
    };

   return this.http.post<{message: string}>(EMAIL_SERVER_URL + 'sendmail', messageData);
  }
}
