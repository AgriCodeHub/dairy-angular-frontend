import { Routes } from "@angular/router";
import { RegistrationComponent } from "./components/registration/registration.component";

export const authRoutes: Routes = [
    { path: 'register', component: RegistrationComponent, data: { routeName: 'register' }},

];