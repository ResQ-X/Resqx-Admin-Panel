export interface LoginFormData {
    name: string
    email: string
    password: string
  }
  
  export interface AuthState {
    isLoading: boolean
    error: string | null
  }
  
  