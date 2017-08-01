import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pokeform',
  templateUrl: './pokeform.component.html',
  styleUrls: ['./pokeform.component.css']
})
export class PokeformComponent implements OnInit {
  pokeForm: FormGroup;

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
  }

}
