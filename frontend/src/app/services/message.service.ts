import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: Date;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = `${environment.apiUrl}/messages`;

  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }

  getMessage(id: number): Observable<Message> {
    return this.http.get<Message>(`${this.apiUrl}/${id}`);
  }

  createMessage(message: Omit<Message, 'id' | 'date' | 'read'>): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message);
  }

  markAsRead(id: number): Observable<Message> {
    return this.http.patch<Message>(`${this.apiUrl}/${id}/read`, {});
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getUnreadCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/unread/count`);
  }
} 