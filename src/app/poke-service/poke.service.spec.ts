import { TestBed, inject } from '@angular/core/testing';

import { PokeService } from './poke.service';

describe('PokeServiceService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [PokeService]
		});
	});

	it('should be created', inject([PokeService], (service: PokeService) => {
		expect(service).toBeTruthy();
	}));
});
