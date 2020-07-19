import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user_investments = [];
  buy_investments = [];
  user_wallet = 0;
  usd_value = 0;
  url = 'https://calm-hamlet-01595.herokuapp.com/'

  constructor( private http: HttpClient) { }

  // Get User Investments as soon as page loads
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


  // Get all investments
  getInvestments() {
    let params = new HttpParams;
    let headers = new HttpHeaders;
    let jwt_token = 'Bearer ' + sessionStorage.getItem('JWT_Token');

    if(this.usd_value == 0) {
      // Error treatment
    }

    console.log('hmmm');
    params = params.set('usd_value', this.usd_value.toString());
    headers = headers.set('Authorization', jwt_token);

    this.http.get(this.url + 'get-investments', {params: params, headers: headers, observe: 'response'})
      .map(response => response)
      .subscribe(
        response => {
          this.buy_investments = response.body['stocks']
          console.log(this.buy_investments)
        },
        error => {
          // Error treatment
        }
      );
  }

}
