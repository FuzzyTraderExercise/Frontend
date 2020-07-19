import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoginerrorComponent } from '../loginerror/loginerror.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authUserForm: FormGroup;
  url = 'https://calm-hamlet-01595.herokuapp.com/login';

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private modal: NgbModal, private router: Router) {
      this.authUserForm = formBuilder.group({
        'email': [null, Validators.required],
        'password': [null, Validators.required]
      });
     }

  ngOnInit(): void {
  }

  //Triggered when the user hits the login button
  submitForm(value: any):void {
    this.http.post(this.url, this.authUserForm.value, {observe: 'response'})
      .subscribe( 
        response => {
          // Redirect to User Dashboard
          sessionStorage.setItem('JWT_Token',response.body['JWT_Token']);
          sessionStorage.setItem('email', this.authUserForm.value.email);
          this.router.navigateByUrl('dashboard');
        },
        error => {
          this.modal.open(LoginerrorComponent);
        }

      );
  }

}
