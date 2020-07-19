import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogerrorComponent } from '../dialogerror/dialogerror.component';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

@Injectable()
export class SignupComponent implements OnInit {
  registerUserForm: FormGroup;
  url = 'https://calm-hamlet-01595.herokuapp.com/sign-up';

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
              public dialog: MatDialog, private modal: NgbModal, private router: Router) {
    this.registerUserForm = formBuilder.group({
      'username': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  //Triggered when the user hits the register button
  submitForm(value: any):void {
    this.http.post(this.url, this.registerUserForm.value, {observe: 'response'})
      .map(response => response)
      .subscribe( 
        response => {
          this.router.navigateByUrl('home');
        },
        error => {
          this.modal.open(DialogerrorComponent);
        }

      );
  }

}
