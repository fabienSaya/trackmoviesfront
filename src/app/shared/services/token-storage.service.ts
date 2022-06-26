import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {


  constructor() { }

  signOut(): void {
    console.log('signOut');
    console.log('TOKEN_KEY avant clear/removeItem : ' + localStorage.getItem(TOKEN_KEY));
    //sessionStorage.removeItem(TOKEN_KEY);
    //sessionStorage.clear();
    localStorage.clear();
    console.log('TOKEN_KEY après removeItem : ' + localStorage.getItem(TOKEN_KEY));
    //sessionStorage.removeItem(USER_KEY);
    }

  public saveToken(token: string): void {
    console.log('TokenStorageService::saveToken, TOKEN_KEY avant save : ' + localStorage.getItem(TOKEN_KEY));
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
    console.log('TokenStorageService::saveToken, TOKEN_KEY après save : ' + localStorage.getItem(TOKEN_KEY));
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    //console.log('saveUser, USER_KEY : ' + USER_KEY  );

  }
  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
