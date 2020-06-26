import { Injectable, Inject } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  list: User[];
  constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) { }
  refreshList(){
    this.http.get(this.baseUrl + '/api/User')
    .toPromise()
    .then(res => this.list = res as User[]);
}
}
