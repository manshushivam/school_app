import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: { email: string; password: string; schoolCode: string }): Observable<any> {
    return this.http.post('/api/auth/login', payload);
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getUserRole(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const decoded: any = jwtDecode(token);
    return decoded.role;
  }
}
