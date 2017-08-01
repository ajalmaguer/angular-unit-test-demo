import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';

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

  it('should show alert if invalid form', () => {
    spyOn(component.alert, 'newAlert');

    // try getting poke info with INVALID form
    component.getPokeInfo();

    expect(component.pokeForm.valid).toBeFalsy();
    expect(component.alert.newAlert).toHaveBeenCalled();

    // get poke info with VALID form
    component.pokeForm.get('number').patchValue('test');
    component.getPokeInfo();

    expect(component.pokeForm.valid).toBeTruthy();
    expect(component.alert.newAlert).toHaveBeenCalledTimes(1);
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
});

describe('manully testing a Poekform component', () => {

  it('can only pick a pokemon between 1 and 150', () => {
    const component = new PokeformComponent(null);

    let control = {value: 'test'} as AbstractControl;
    let err = component.validateNumber(control);
    expect(err).toBeNull();

    control = {value: '123123'} as AbstractControl;
    err = component.validateNumber(control);
    expect(Object.keys(err)).toContain('ogPokemon');
  });
});
