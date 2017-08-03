import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';

// services
import { PokeService } from '../poke-service/poke.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/of';

class PokeServiceStub {
	getPokemon() {
		return Observable.of(null);
	}
}

// components
import { PokeformComponent } from './pokeform.component';
import { AlertComponent } from '../shared/alert/alert.component';

describe('PokeformComponent', () => {
	let component: PokeformComponent;
	let fixture: ComponentFixture<PokeformComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ ReactiveFormsModule ],
			declarations: [
				PokeformComponent,
				AlertComponent,
			],
			providers: [
				{ provide: PokeService, useClass: PokeServiceStub }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PokeformComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});

	it('can only pick a pokemon between 1 and 150', () => {
		component.pokeForm.get('number').patchValue(0);
		expect(component.pokeForm.valid).toBeFalsy();

		component.pokeForm.get('number').patchValue(12);
		expect(component.pokeForm.valid).toBeTruthy();

		component.pokeForm.get('number').patchValue(12);
		expect(component.pokeForm.valid).toBeTruthy();

		component.pokeForm.get('number').patchValue(151);
		expect(component.pokeForm.valid).toBeFalsy();
	});

	it('should show alert and not hit api if invalid form', () => {
		// get service
		const pokeService = fixture.debugElement.injector.get(PokeService);

		// setup spies
		spyOn(component.alert, 'newAlert');
		spyOn(pokeService, 'getPokemon');

		// try getting poke info with INVALID form
		component.getPokeInfo();

		expect(component.pokeForm.valid).toBeFalsy();
		expect(component.alert.newAlert).toHaveBeenCalledWith('error', 'invalid form');
		expect(pokeService.getPokemon).not.toHaveBeenCalled();
	});

	it('should getpokeinfo if valid form', () => {
		// get service
		const pokeService = fixture.debugElement.injector.get(PokeService);
		const testPokemon = {name: 'test', sprite: 'test.png'};

		// create spies
		spyOn(pokeService, 'getPokemon').and.returnValue(Observable.of(testPokemon));
		spyOn(component.alert, 'newAlert');
		spyOn(component.alert, 'hideAlert');

		// get poke info with VALID form
		component.pokeForm.get('number').patchValue('test');
		component.getPokeInfo();

		expect(component.alert.newAlert).toHaveBeenCalledWith('', 'Fetching Pokemon...');
		expect(component.alert.hideAlert).toHaveBeenCalled();
		expect(component.pokemon).toEqual(testPokemon);
	});

	it('should display pokemon on page', () => {
		let pokemonElement = fixture.debugElement.query(By.css('.pokemon'));

		expect(pokemonElement).toBeFalsy();

		component.pokemon = {name: 'test', sprite: 'test.png'};
		fixture.detectChanges();

		pokemonElement = fixture.debugElement.query(By.css('.pokemon'));
		const pokeImage = fixture.debugElement.query(By.css('.pokemon img'));
		
		expect(pokemonElement).toBeTruthy();
		expect(pokemonElement.nativeElement.textContent).toContain('test');
		expect(pokeImage.nativeElement.src).toContain('test.png');
	});
});

describe('manully testing a Poekform component', () => {

	it('can only pick a pokemon between 1 and 150', () => {
		const component = new PokeformComponent(null, null);

		let control = {value: 'test'} as AbstractControl;
		let err = component.validateNumber(control);
		expect(err).toBeNull();

		control = {value: '123123'} as AbstractControl;
		err = component.validateNumber(control);
		expect(Object.keys(err)).toContain('ogPokemon');
	});
});
