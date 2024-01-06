import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AuthService } from "../../services/user.service";
import { RegistrationComponent } from "./registration.component";
import { UserProfile } from "../../models/users.models";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: AuthService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationComponent, HttpClientTestingModule, BrowserAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize registration form', () => {
    expect(component.registrationForm).toBeDefined();
    expect(component.registrationForm.controls['username'].value).toBe('');
    expect(component.registrationForm.controls['email'].value).toBe('');
    expect(component.registrationForm.controls['first_name'].value).toBe('');
    expect(component.registrationForm.controls['last_name'].value).toBe('');
    expect(component.registrationForm.controls['sex'].value).toBe('');
    expect(component.registrationForm.controls['phone_number'].value).toBe('');
    expect(component.registrationForm.controls['password'].value).toBe('');
  });

  it('should not submit if form is invalid', async () => {
    spyOn(authService, 'register');
    component.registrationForm.controls['username'].setValue('fghdh');
    await component.onSubmit();
    expect(authService.register).not.toHaveBeenCalled();
  });

  it('should mark form as invalid if fields are empty', () => {
    expect(component.registrationForm.controls['username'].value).toBe('');
    expect(component.registrationForm.controls['email'].value).toBe('');
    expect(component.registrationForm.controls['first_name'].value).toBe('');
    expect(component.registrationForm.controls['last_name'].value).toBe('');
    expect(component.registrationForm.controls['sex'].value).toBe('');
    expect(component.registrationForm.controls['phone_number'].value).toBe('');
    expect(component.registrationForm.controls['password'].value).toBe('');
    expect(component.registrationForm.valid).toBeFalsy();
  });


  it('should call AuthService.register when form is valid and submitted', async () => {
    spyOn(authService, 'register');
    component.registrationForm.controls['username'].setValue('testUser');
    component.registrationForm.controls['email'].setValue('test@test.com');
    component.registrationForm.controls['first_name'].setValue('Test');
    component.registrationForm.controls['last_name'].setValue('User');
    component.registrationForm.controls['sex'].setValue('Male');
    component.registrationForm.controls['phone_number'].setValue('+1234567890');
    component.registrationForm.controls['password'].setValue('password123');
    await component.onSubmit();
    expect(authService.register).toHaveBeenCalled();
  });


  it('should handle registration success', async () => {
    const response: UserProfile = {
      id: 1,
      email: 'test@test.com',
      first_name: 'Test',
      last_name: 'User',
      username: 'testUser',
      phone_number: "+1234567890",
      sex: "Male"
    };
    spyOn(authService, 'register').and.returnValue(Promise.resolve(response));
    spyOn(component, 'handleRegistrationSuccess');
    component.registrationForm.controls['username'].setValue('testUser');
    component.registrationForm.controls['email'].setValue('test@test.com');
    component.registrationForm.controls['first_name'].setValue('Test');
    component.registrationForm.controls['last_name'].setValue('User');
    component.registrationForm.controls['sex'].setValue('Male');
    component.registrationForm.controls['phone_number'].setValue('+1234567890');
    component.registrationForm.controls['password'].setValue('password123');
    await component.onSubmit();
    expect(authService.register).toHaveBeenCalled();
    expect (component.handleRegistrationSuccess).toHaveBeenCalledWith(response);
  });

  it('should handle registration error', async () => {
    const error = { email: 'Email already exists.' };
    spyOn(authService, 'register').and.returnValue(Promise.reject(error));
    spyOn(component, 'handleRegistrationError');
    component.registrationForm.controls['username'].setValue('testUser');
    component.registrationForm.controls['email'].setValue('test@test.com');
    component.registrationForm.controls['first_name'].setValue('Test');
    component.registrationForm.controls['last_name'].setValue('User');
    component.registrationForm.controls['sex'].setValue('Male');
    component.registrationForm.controls['phone_number'].setValue('+123456789');
    component.registrationForm.controls['password'].setValue('password123');
    await component.onSubmit();
    expect(authService.register).toHaveBeenCalled();
    expect(component.handleRegistrationError).toHaveBeenCalledWith(error);
  });
});