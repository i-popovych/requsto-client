import { $authAPI } from "./instance";
import { Token } from "./libs/types/Token.type";
import { LoginParams } from "./libs/types/params/Login.type";
import { SignUp } from "./libs/types/params/Signup.type";

class AuthService {
  login({ email, password }: LoginParams) {
    return $authAPI.post<Token>("/auth/login", { email, password });
  }

  registration({ email, password, firstName, lastName }: SignUp) {
    return $authAPI.post<Token>("/auth/signup", {
      email,
      password,
      firstName,
      lastName,
    });
  }
}

export const authService = new AuthService();
