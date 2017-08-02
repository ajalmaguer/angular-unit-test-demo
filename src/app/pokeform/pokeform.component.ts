import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { PokeService } from '../poke-service/poke.service';

import { AlertComponent } from '../shared/alert/alert.component';

@Component({
	selector: 'app-pokeform',
	templateUrl: './pokeform.component.html',
	styleUrls: ['./pokeform.component.css']
})
export class PokeformComponent implements OnInit {
	pokeForm: FormGroup;
	@ViewChild(AlertComponent) alert: AlertComponent;
	pokemon = null;

	constructor(
		private formBuilder: FormBuilder,
		private pokeService: PokeService,
	) { }

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
		} else {
			this.alert.newAlert('', 'Fetching Pokemon...');
			this.pokemon = null;
		}

		const id = this.pokeForm.get('number').value;

		this.pokeService.getPokemon(id).subscribe(
			res => {
				this.pokemon = res;
				this.alert.hideAlert();
			}, err => {
				this.alert.newAlert('Error', 'Can\'t fetch pokemon at this time' );
			}
		);
	}
}
