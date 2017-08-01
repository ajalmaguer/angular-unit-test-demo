import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

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
});
