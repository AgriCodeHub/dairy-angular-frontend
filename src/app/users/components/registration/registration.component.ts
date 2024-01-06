import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserProfile } from "../../models/users.models";
import { AuthService } from "../../services/user.service";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";


@Component({
  selector: 'registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  public authService = inject(AuthService);
  public fb = inject(FormBuilder);
  public snackBar = inject(MatSnackBar);

  public router = inject(Router);

  constructor() {
    /**
     * Initializes the registration form with validators.
     */
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      phone_number: ['', [Validators.required, Validators.pattern(/^\+?[0-9]*$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  /**
   * Handles the form submission.
   * If the form is valid, it calls the registration API and handles the response.
   */
  async onSubmit() {
    if (this.registrationForm.valid) {
      try {
        const registrationData  = this.registrationForm.value;
        const response = await this.authService.register(registrationData);
        this.handleRegistrationSuccess(response);
      } catch (error) {
        this.handleRegistrationError(error);
      }
    }
  }

  /**
   * Handles the successful registration response.
   * Displays a success message using the snack bar.
   * @param response - The registration response.
   */
  public handleRegistrationSuccess(response: UserProfile) {
    const message = 'Welcome' +' '+ response.username + '';
    this.openSnackBar(message, 'Registration Successful', 4000);
  }

  /**
   * Handles the registration error response.
   * Displays an error message using the snack bar.
   * @param error - The registration error.
   */
  public handleRegistrationError(error: any) {
    let message = '';
    const fields = ['email', 'username', 'first_name', 'last_name', 'phone_number', 'sex'];
    for (let field of fields) {
      if (error[field]) {
        message += `${field.charAt(0).toUpperCase() + field.slice(1)} Error: ${error[field].join(', ')}. \n`;
      }
    }
    if (message === '') {
      message = 'Unable to create account.';
    }
    this.openSnackBar(message, 'Registration Failed', 5000);
  }

  /**
   * Displays a snack bar with a specified message and action.
   * @param message - The message to be displayed.
   * @param action - The action button text.
   * @param duration - The duration for which the snack bar is displayed.
   */
  private openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration,
      verticalPosition: 'top',
    });
  }
}