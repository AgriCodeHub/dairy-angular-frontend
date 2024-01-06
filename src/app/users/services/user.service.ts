import { Injectable, inject } from '@angular/core';
import { RegistrationData, UserProfile } from '../models/users.models';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = `${environment.apiUrl}/auth/users/`;

  private http = inject(HttpClient);

  /**
   * Registers a new user.
   * @param userData - The user registration data.
   * @returns A promise that resolves to the registration response.
   *          If the registration is successful, the response will contain the registered user data.
   *          If the registration fails, the response will contain an error message.
   * @throws If an error occurs during registration.
   */
  async register(userData: RegistrationData): Promise<UserProfile> {
    try {
      const response = await firstValueFrom(this.http.post<UserProfile>(this.registerUrl, userData));
      return response;
    } catch (Error: any) {
      throw Error.error;
    }
  }
}
