import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialogerror',
  templateUrl: './dialogerror.component.html',
  styleUrls: ['./dialogerror.component.css']
})
export class DialogerrorComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
