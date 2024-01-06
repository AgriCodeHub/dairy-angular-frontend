/**
 * Represents the data required for user registration.
 */
export type RegistrationData = {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    sex: string;
}

/**
 * Represents the user profile data.
 */
export type UserProfile = {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    sex: string;
    is_assistant_farm_manager?: boolean;
    is_farm_manager?: boolean;
    is_farm_owner?: boolean;
    is_farm_worker?: boolean;
    is_team_leader?: boolean;
}
