import { TestBed, inject } from '@angular/core/testing';

import { PokeService } from './poke.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Http } from '@angular/http';
class HttpStub {
	get() {}
}

describe('PokeServiceService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				PokeService,
				{ provide: Http, useClass: HttpStub }
			]
		});
	});

	it('should be created', inject([PokeService], (service: PokeService) => {
		expect(service).toBeTruthy();
	}));

	it('should get pokemon', inject([PokeService, Http], (service: PokeService, http: Http) => {
		spyOn(http, 'get').and.returnValue(Observable.of(null));

		service.getPokemon(1);

		expect(http.get).toHaveBeenCalledWith('http://pokeapi.co/api/v2/pokemon/1/');
	}));

});
