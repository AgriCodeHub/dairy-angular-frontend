import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './user.service';
import { UserProfile } from '../models/users.models';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('authToken'); // Clear stored token after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login a user and store the token in local storage', (done) => {
    const mockUserResponse: UserProfile = {
        // Provide a sample UserProfile data
        id: 1,
        username: 'testUser',
        email: 'test@test.com',
        first_name: 'Test',
        last_name: 'User',
        phone_number: '+1234567890',
        sex: 'Male'
    };

    const mockLoginData = {
      usernameOrEmail: 'testUser',
      password: 'password123'
    };

    const mockToken = 'mockToken'; // Assuming a mock token is returned from the API

    service.login(mockLoginData.usernameOrEmail, mockLoginData.password).then((response) => {
      expect(response).toEqual(mockUserResponse);
      expect(localStorage.getItem('authToken')).toBe(mockToken); // Check if the token is stored in local storage
      done();
    });

    const mockReq = httpMock.expectOne(`${environment.apiUrl}/auth/login/`);
    expect(mockReq.request.method).toBe('POST');
    
    mockReq.flush({ user: mockUserResponse, token: mockToken });
  });

  it('should handle login error', (done) => {
    const mockLoginData = {
      usernameOrEmail: 'testUser',
      password: 'password123'
    };

    const mockErrorResponse = { message: 'Invalid credentials' };

    service.login(mockLoginData.usernameOrEmail, mockLoginData.password).catch((error) => {
      expect(error).toEqual(mockErrorResponse);
      done();
    });

    const mockReq = httpMock.expectOne(`${environment.apiUrl}/auth/login/`);
    expect(mockReq.request.method).toBe('POST');
    
    mockReq.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });
  });
});
