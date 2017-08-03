import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
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

fdescribe('PokeformComponent', () => {
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
		const form = component.pokeForm;
		
		expect(form.valid).toBeFalsy();

		form.patchValue({number: 123});
		expect(form.valid).toBeTruthy();
		
		form.patchValue({number: 0});
		expect(form.valid).toBeFalsy();

		form.patchValue({number: 151});
		expect(form.valid).toBeFalsy();
	});

	it('should show alert and not hit api if invalid form', () => {
		expect(component.pokeForm.valid).toBeFalsy();

		spyOn(component.alert, 'newAlert');
		const pokeService = fixture.debugElement.injector.get(PokeService);
		spyOn(pokeService, 'getPokemon');

		component.getPokeInfo();
		expect(component.alert.newAlert).toHaveBeenCalledWith('error', 'invalid form');
		expect(pokeService.getPokemon).not.toHaveBeenCalled();
	});

	it('should getpokeinfo if valid form', () => {
		component.pokeForm.patchValue({number: 123});
		expect(component.pokeForm.valid).toBeTruthy();

		spyOn(component.alert, 'newAlert');
		const pokeService = fixture.debugElement.injector.get(PokeService);
		spyOn(pokeService, 'getPokemon').and.returnValue(Observable.of(null));

		component.getPokeInfo();
		expect(component.alert.newAlert).toHaveBeenCalledWith('', 'Fetching Pokemon...');
		expect(pokeService.getPokemon).toHaveBeenCalled();
	});

	fit('should display pokemon on page', () => {
		component.pokemon = {name: 'pikachu', sprite: 'pikachu.png'};
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
