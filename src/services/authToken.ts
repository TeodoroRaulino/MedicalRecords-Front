import jwtDecode from "jwt-decode";
import { DASHBOARD_URL, TOKEN_STORAGE_KEY } from "@/utils/constants";
import Router from "next/router";

type DecodedToken = {
  email: string;
  exp: number;
};

export class AuthToken {
  readonly decodedToken: DecodedToken | null;

  constructor(readonly token?: string) {
    if (!token) {
      throw new Error("Token not provided");
    }

    try {
      this.decodedToken = jwtDecode(token) as DecodedToken;
    } catch (e) {
      throw new Error("Unable to decode token");
    }
  }

  get expiresAt(): Date {
    return new Date(this.decodedToken!.exp * 1000);
  }

  get isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  get isAuthenticated(): boolean {
    return !this.isExpired;
  }

  static fromToken(token?: string): AuthToken {
    return new AuthToken(token);
  }

  static fromStorage(): AuthToken | null {
    if (typeof window === "undefined") {
      return null;
    }

    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) {
      return null;
    }

    return new AuthToken(token);
  }

  static checkTokenLogin() {
    const authToken = AuthToken.fromStorage();
    if (authToken && authToken.isAuthenticated) {
      Router.push(DASHBOARD_URL);
    }
  }
}
