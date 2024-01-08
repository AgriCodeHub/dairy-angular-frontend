import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/user.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    CommonModule, // Importing CommonModule for common Angular directives
    ReactiveFormsModule, // Importing ReactiveFormsModule for form functionality
    MatFormFieldModule, // Importing material form field module
    MatInputModule, // Importing material input module
    MatButtonModule, // Importing material button module
    MatSnackBarModule, // Importing material snack bar module for notifications
  ],
  templateUrl: './login.component.html', // HTML template associated with this component
  styleUrls: ['./login.component.css'] // Stylesheet associated with this component
})
export class LoginComponent {
  loginForm: FormGroup; // FormGroup to manage the login form

  constructor(
    private authService: AuthService, // Injecting AuthService for user authentication
    private fb: FormBuilder, // FormBuilder for creating forms
    private snackBar: MatSnackBar, // MatSnackBar for displaying notifications
    private router: Router // Router for navigation within the application
  ) {
    // Initializing the login form with FormBuilder
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]], // Username or Email field with required validation
      password: ['', [Validators.required]], // Password field with required validation
    });
  }

  async onSubmit() {
    // Check if the form is valid before attempting to submit
    if (this.loginForm.valid) {
      try {
        // Destructuring the usernameOrEmail and password from the form value
        const { usernameOrEmail, password } = this.loginForm.value;
        // Attempting login using AuthService
        const response = await this.authService.login(usernameOrEmail, password);
        // Handling successful login
        this.handleLoginSuccess(response);
      } catch (error) {
        // Handling login error
        this.handleLoginError(error);
      }
    }
  }

  // Method to handle successful login response
  public handleLoginSuccess(response: any) {
    // Creating a success message for the user
    const message = 'Welcome back, ' + response.username + '!';
    // Displaying a snack bar notification for successful login
    this.openSnackBar(message, 'Login Successful', 4000);
    // Redirecting to a different route after successful login (example: dashboard)
    this.router.navigate(['/dashboard']);
  }

  // Method to handle login error response
  public handleLoginError(error: any) {
    // Setting a default error message
    let message = 'Unable to login. Please check your credentials.';
    // Checking if there's a specific error message available
    if (error && error.message) {
      message = error.message;
    }
    // Displaying a snack bar notification for login failure
    this.openSnackBar(message, 'Login Failed', 5000);
  }

  // Method to display a snack bar notification
  private openSnackBar(message: string, action: string, duration: number) {
    // Displaying a snack bar notification with provided message, action, and duration
    this.snackBar.open(message, action, {
      duration,
      verticalPosition: 'top', // Setting the position of the snack bar
    });
  }
}
