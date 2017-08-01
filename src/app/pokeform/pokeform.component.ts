import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-pokeform',
  templateUrl: './pokeform.component.html',
  styleUrls: ['./pokeform.component.css']
})
export class PokeformComponent implements OnInit {
  pokeForm: FormGroup;
  @ViewChild(AlertComponent) alert: AlertComponent;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.pokeForm = this.formBuilder.group({
      'number' : ['', Validators.required]
    });
  }

  getPokeInfo() {
    console.log('get pokemon number', this.pokeForm.get('number').value);
    if (this.pokeForm.invalid) {
      this.alert.newAlert('error', 'invalid form');
      return console.log('form is invalid.');
    }

  }

}
