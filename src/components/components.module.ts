import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { NgPipesModule } from 'ng-pipes';

import { PageTopComponent } from './page-top/page-top';
import { MapsComponent } from './maps/maps';
import { UiCreatorComponent } from './ui-creator/ui-creator';

@NgModule({
	declarations: [
		PageTopComponent,
		MapsComponent,
		UiCreatorComponent
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
		UiCreatorComponent
	]
})
export class ComponentsModule { }
