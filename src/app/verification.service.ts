import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerificationService {
  private apiUrl = 'http://localhost:3000'; // Your backend API URL

  constructor(private http: HttpClient) {}

  // Send verification code (OTP)
  sendVerificationCode(phoneNumber: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/send-verification-code`, { phoneNumber });
  }

  // Verify the OTP
  verifyCode(phoneNumber: string, code: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-code`, { phoneNumber, code });
  }
}
