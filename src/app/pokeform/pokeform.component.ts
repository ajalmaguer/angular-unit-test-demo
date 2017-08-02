import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

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
			'number' : ['', [Validators.required, this.validateNumber]]
		});
	}

	validateNumber(control: AbstractControl) {
		if (control.value < 1 || control.value > 150) {
			return {ogPokemon: 'Pick number between 1 and 150'};
		} else {
			return null;
		}
	}

	getPokeInfo() {
		if (this.pokeForm.invalid) {
			this.alert.newAlert('error', 'invalid form');
			return;
		}

	}

}
