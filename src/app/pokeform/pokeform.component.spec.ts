import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// components
import { PokeformComponent } from './pokeform.component';

describe('PokeformComponent', () => {
	let component: PokeformComponent;
	let fixture: ComponentFixture<PokeformComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ PokeformComponent ],
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
		
	});

	it('should show alert and not hit api if invalid form', () => {
		
	});

	it('should getpokeinfo if valid form', () => {
		
	});

	it('should display pokemon on page', () => {
		
	});
});

describe('manully testing a Poekform component', () => {

	it('can only pick a pokemon between 1 and 150', () => {
		
	});
});
