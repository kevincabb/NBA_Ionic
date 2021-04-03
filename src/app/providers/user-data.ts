import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  public apiUrl = environment.api;
  private tokenURL = this.apiUrl + '/api/auth/login';
  private token;

  public check;
  $check = new BehaviorSubject<number>(this.check);

  private signupBoolURL = this.apiUrl + '/cred/check';
  private loginBoolURL = this.apiUrl + '/cred/logincheck';
  private signupURL = this.apiUrl + '/cred/add';
  private getIdURL = this.apiUrl + '/cred/'
  private getAccountURL = this.apiUrl + '/cred/account/'
  private updateUsernameURL = this.apiUrl + '/cred/updateusername'
  private updatePasswordURL = this.apiUrl + '/cred/updatepassword'

  url = this.apiUrl + '/cred';
  urlSheet;
  credentials: UserData[] = [];
  accountID;
  accountInfo;
  loggedIn: UserData;
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';

  $accountInfo = new BehaviorSubject<string>(this.accountInfo);

  constructor(
    public storage: Storage,
    private http: HttpClient,
    private router: Router
  ) { 
  }

  async updateAccountUsername(cred: any){
    await this.http.post(this.updateUsernameURL, cred).toPromise().then(data => {
      return data;
    });
  }
  
  async updateAccountPassword(cred: any){
    await this.http.post(this.updatePasswordURL, cred).toPromise().then(data => {
      return data;
    });
  }

  async getId(cred: any){
    await this.http.get(this.getIdURL + cred).toPromise().then(resp => {
      this.accountID = resp;
    });
  }

  async getAccount(id: number){
    await this.http.get(this.getAccountURL + id).toPromise().then(resp => {
      this.accountInfo = resp;
    });
  }

  async SignUpBool(cred: any){
    await this.http.post(this.signupBoolURL, cred).toPromise().then(data => {
      this.check = data;
    });
  }

  async LogInBool(cred: any){
    await this.http.post(this.loginBoolURL, cred).toPromise().then(data =>{
      this.check = data;
    });


  }

  getBool(){
    return this.check;
  }

  GetCredetials() {
    this.urlSheet = this.http.get(this.url);

    this.urlSheet.subscribe(x => {
      for (let s of x) {
        this.credentials.push(s);
      }
    });
  }

  idNum(){
    return this.accountID;
  }

  async account(){
    return this.accountInfo;
    
  }

  get(): UserData[] {
    return this.credentials;
  }

  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  login(username: string, credentials: any): Promise<any> {
    this.http.post(this.tokenURL, credentials).subscribe(data => {
      this.token = data;
      
      this.token = this.token.token;
      localStorage.setItem('jwt',JSON.stringify(this.token));
      this.router.navigateByUrl('/app/tabs/schedule');
    });
    
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:login'));
    });
  }
  
  signup(username: string, cred: any):Promise<any> {
    this.http.post(this.signupURL, cred).subscribe(data => {
      console.log(data);
    });
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  }

  logout(): Promise<any> {
    localStorage.removeItem('jwt');
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }
}
