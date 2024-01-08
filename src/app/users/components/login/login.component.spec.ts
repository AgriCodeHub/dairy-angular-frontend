import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AuthService } from "../../services/user.service";
import { LoginComponent } from "./login.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserProfile } from "../../models/users.models";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Importing HttpClientTestingModule for testing HTTP requests
        BrowserAnimationsModule // Importing BrowserAnimationsModule for animations
      ],
      declarations: [LoginComponent], // Declaring the component to be tested
      providers: [AuthService] // Providing AuthService for dependency injection
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent); // Creating a fixture for the component
    component = fixture.componentInstance; // Accessing the component instance
    authService = TestBed.inject(AuthService); // Injecting AuthService into the component
    fixture.detectChanges(); // Triggering change detection
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifying that the component was created successfully
  });

  it('should initialize login form', () => {
    expect(component.loginForm).toBeDefined(); // Checking if the login form is initialized
    expect(component.loginForm.controls['usernameOrEmail'].value).toBe(''); // Verifying initial values
    expect(component.loginForm.controls['password'].value).toBe(''); // Verifying initial values
  });

  it('should not submit if form is invalid', async () => {
    spyOn(authService, 'login'); // Mocking the login service
    component.loginForm.controls['usernameOrEmail'].setValue('testUser'); // Setting form values
    await component.onSubmit(); // Calling the form submission method
    expect(authService.login).not.toHaveBeenCalled(); // Verifying that login was not called
  });

  it('should mark form as invalid if fields are empty', () => {
    // Checking if form fields are empty and the form is invalid
    expect(component.loginForm.controls['usernameOrEmail'].value).toBe('');
    expect(component.loginForm.controls['password'].value).toBe('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should call AuthService.login when form is valid and submitted', async () => {
    spyOn(authService, 'login'); // Mocking the login service
    // Setting valid form values
    component.loginForm.controls['usernameOrEmail'].setValue('testUser');
    component.loginForm.controls['password'].setValue('password123');
    await component.onSubmit(); // Calling the form submission method
    expect(authService.login).toHaveBeenCalled(); // Verifying that login was called
  });

  it('should handle login success', async () => {
    const response = {
      // Simulating a successful login response with UserProfile fields
      id: 1,
      email: 'test@test.com',
      username: 'testUser',
      first_name: 'Test',
      last_name: 'User',
      phone_number: '+1234567890',
      sex: 'Male'
    };
    
    spyOn(authService, 'login').and.returnValue(Promise.resolve(response as UserProfile)); // Mocking login with the response
    spyOn(component, 'handleLoginSuccess'); // Spying on handleLoginSuccess method
    // Setting valid form values
    component.loginForm.controls['usernameOrEmail'].setValue('testUser');
    component.loginForm.controls['password'].setValue('password123');
    await component.onSubmit(); // Calling the form submission method
    expect(authService.login).toHaveBeenCalled(); // Verifying that login was called
    expect(component.handleLoginSuccess).toHaveBeenCalledWith(response as UserProfile); // Verifying successful login handling
  });

  it('should handle login error', async () => {
    const error = { message: 'Invalid credentials' };
    spyOn(authService, 'login').and.returnValue(Promise.reject(error)); // Mocking login to return an error
    spyOn(component, 'handleLoginError'); // Spying on handleLoginError method
    // Setting valid form values
    component.loginForm.controls['usernameOrEmail'].setValue('testUser');
    component.loginForm.controls['password'].setValue('password123');
    await component.onSubmit(); // Calling the form submission method
    expect(authService.login).toHaveBeenCalled(); // Verifying that login was called
    expect(component.handleLoginError).toHaveBeenCalledWith(error); // Verifying error handling
  });
});
