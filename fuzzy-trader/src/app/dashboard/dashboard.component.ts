import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user_investments = [];
  user_wallet = 0;
  url = 'https://calm-hamlet-01595.herokuapp.com/'

  constructor( private http: HttpClient) { }

  ngOnInit(): void {
    let params = new HttpParams;
    let headers = new HttpHeaders;
    let jwt_token = 'Bearer ' + sessionStorage.getItem('JWT_Token');

    params = params.set('email', sessionStorage.getItem('email'));
    headers = headers.set('Authorization', jwt_token);

    this.http.get(this.url + 'get-userinvestment', {params: params, headers: headers, observe: 'response'})
      .map(response => response)
      .subscribe(
        response => {
          this.user_investments = response.body['user_stocks']

          for(let investment of this.user_investments) {
            this.user_wallet = investment.usd_value
          }
        },
        error => {}
      );
  }

}
