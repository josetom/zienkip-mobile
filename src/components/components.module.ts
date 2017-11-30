import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { NgPipesModule } from 'ng-pipes';

import { PageTopComponent } from './page-top/page-top';
import { MapsComponent } from './maps/maps';
import { UiCreatorComponent } from './ui-creator/ui-creator';
import { AutocompleteComponent } from './autocomplete/autocomplete';

@NgModule({
	declarations: [
		PageTopComponent,
		MapsComponent,
		UiCreatorComponent,
		AutocompleteComponent
	],
	imports: [
		IonicModule.forRoot(ComponentsModule),
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyBZwjtfxXrP_lYHayzysutAU8ucbrwky-E'
		}),
		NgPipesModule
	],
	exports: [
		PageTopComponent,
		MapsComponent,
		UiCreatorComponent,
		AutocompleteComponent
	]
})
export class ComponentsModule { }
