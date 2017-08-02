import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PokeService {
	baseUrl = 'http://pokeapi.co/api/v2';

	constructor(private http: Http) { }

	getPokemon(id) {
		return this.http.get(this.baseUrl + '/pokemon/' + id + '/')
						.map(res => res.json())
						.map(res => {
							return {
								name: res.name,
								sprite: res.sprites.front_default,
							};
						});
	}

}
