import { Routes } from "@angular/router";
import { RegistrationComponent } from "./components/registration/registration.component";
import { LoginComponent } from "./components/login/login.component";


export const authRoutes: Routes = [
    { path: 'register', component: RegistrationComponent, data: { routeName: 'register' }},
    { path: 'login', component: LoginComponent, data: { routeName: 'register' }},

];