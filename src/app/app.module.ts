import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// services
import { PokeService } from './poke-service/poke.service';

// components
import { AppComponent } from './app.component';
import { PokeformComponent } from './pokeform/pokeform.component';
import { AlertComponent } from './shared/alert/alert.component';

@NgModule({
	declarations: [
		AppComponent,
		PokeformComponent,
		AlertComponent,
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		HttpModule,
	],
	providers: [
		PokeService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
