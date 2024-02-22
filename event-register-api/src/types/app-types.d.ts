declare module 'app-types' {
  export interface AppUser {
    user_id: string;
    name: string;
    email: string;
    password: string;
  };

  export interface AddUserResult {
    success: boolean;
  };
};