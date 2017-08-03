import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

// services
import { PokeService } from '../poke-service/poke.service';
class PokeServiceStub {
	getPokemon() {}
}

// components
import { PokeformComponent } from './pokeform.component';
import { AlertComponent } from '../shared/alert/alert.component';
@Component({
	selector: 'app-alert',
	template: ''
})
class AlertStubComponent {}

describe('PokeformComponent', () => {
	let component: PokeformComponent;
	let fixture: ComponentFixture<PokeformComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ ReactiveFormsModule ],
			declarations: [ 
				PokeformComponent,
				AlertComponent
			],
			providers: [
				{ provide: PokeService, useClass: PokeServiceStub },
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
		expect(component.pokeForm.valid).toBeFalsy();

		component.pokeForm.patchValue({number: 1});
		expect(component.pokeForm.valid).toBeTruthy();

		component.pokeForm.patchValue({number: 0});
		expect(component.pokeForm.valid).toBeFalsy();

		component.pokeForm.get('number').patchValue(151);
		expect(component.pokeForm.valid).toBeFalsy();
	});

	it('should show alert and not hit api if invalid form', () => {
		expect(component.pokeForm.valid).toBeFalsy();

		const pokeService = fixture.debugElement.injector.get(PokeService);
		spyOn(pokeService, 'getPokemon');
		spyOn(component.alert, 'newAlert');

		component.getPokeInfo();

		expect(component.alert.newAlert).toHaveBeenCalledWith('error', 'invalid form');
		expect(pokeService.getPokemon).not.toHaveBeenCalled();
	});

	it('should getpokeinfo if valid form', () => {
		// setup test
		component.pokemon = { name: 'pikachu', sprite: 'pikachu.png' };
		component.pokeForm.patchValue({ number: 25 });

		// sanity check
		expect(component.pokeForm.valid).toBeTruthy();
		expect(component.pokemon).not.toBeNull();

		// create spies
		spyOn(component.alert, 'newAlert');
		const pokeService = fixture.debugElement.injector.get(PokeService);
		spyOn(pokeService, 'getPokemon').and.returnValue(Observable.of(null));

		// do the thing
		component.getPokeInfo();

		// make assertions
		expect(component.alert.newAlert).toHaveBeenCalledWith('', 'Fetching Pokemon...');
		expect(pokeService.getPokemon).toHaveBeenCalledWith(25);
		expect(component.pokemon).toBeNull();
	});

	it('should display pokemon on page', () => {
		component.pokemon = { name: 'pikachu', sprite: 'pikachu.png' };
		fixture.detectChanges();

		const pokemonDebugElement = fixture.debugElement.query(By.css('.pokemon'));
		const imgDebugElement = fixture.debugElement.query(By.css('.pokemon img'));
		
		expect(pokemonDebugElement.nativeElement.textContent).toContain('pikachu');
		expect(imgDebugElement.nativeElement.src).toContain('pikachu.png');

	});
});

describe('manully testing a Poekform component', () => {

	it('can only pick a pokemon between 1 and 150', () => {
		
	});
});
