import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  name: string;
  email: string;
  message: string;

  constructor() {}

  ngOnInit() {}

  submit() {}
}
