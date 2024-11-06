import { Component } from '@angular/core';
import { VerificationService } from './verification.service'; // Import the service

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'phone-number-verification';
  phoneNumber: string = '';
  verificationCode: string = '';
  sentCode: string = ''; // This will be set by the backend
  verificationSent: boolean = false;
  isVerified: boolean = false;
  isSendingCode: boolean = false;

  constructor(private verificationService: VerificationService) {} // Inject VerificationService

  // This function will be called when the user clicks on "Send Verification Code"
  // sendVerificationCode() {
  //   if (this.phoneNumber.length === 10) {
  //     this.isSendingCode = true;

  //     // Call the backend API to send the verification code (OTP)
  //     this.verificationService.sendVerificationCode(this.phoneNumber).subscribe(
  //       (response) => {
  //         // In a real scenario, the code sent would be returned by the backend
  //         this.sentCode = response.verificationCode; // For example, backend may return the code
  //         this.verificationSent = true;
  //         this.isSendingCode = false;
  //         console.log(`Verification code sent to ${this.phoneNumber}: ${this.sentCode}`);
  //       },
  //       (error) => {
  //         console.error('Error sending verification code:', error);
  //         this.isSendingCode = false;
  //         alert('Failed to send verification code.');
  //       }
  //     );
  //   } else {
  //     alert('Please enter a valid 10-digit phone number.');
  //   }
  // }

  // Inside your Angular component's method
sendVerificationCode() {
  if (this.phoneNumber.length === 10) {
    this.isSendingCode = true;

    this.verificationService.sendVerificationCode(this.phoneNumber).subscribe(
      (response) => {
        this.sentCode = response.message;
        this.verificationSent = true;
        this.isSendingCode = false;
      },
      (error) => {
        this.isSendingCode = false;
        // Handle error - show an alert or message to the user
        alert(error.error.message);  // Display the error message from the backend
      }
    );
  } else {
    alert('Please enter a valid 10-digit phone number.');
  }
}


  // This function will be called when the user clicks on "Verify"
  verifyCode() {
    if (this.verificationCode === this.sentCode) {
      this.isVerified = true;
      console.log('Phone number verified successfully');
    } else {
      alert('Incorrect verification code.');
    }
  }

  // This function is called when the user enters the phone number to ensure proper input
  onPhoneNumberInput() {
    // Optional: Reset verified state when phone number changes
    this.isVerified = false;
  }
}
