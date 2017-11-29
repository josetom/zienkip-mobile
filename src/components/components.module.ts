import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';

import { PageTopComponent } from './page-top/page-top';
import { MapsComponent } from './maps/maps';

@NgModule({
	declarations: [PageTopComponent,
		MapsComponent],
	imports: [IonicModule.forRoot(ComponentsModule),
	AgmCoreModule.forRoot({
		apiKey: 'AIzaSyBZwjtfxXrP_lYHayzysutAU8ucbrwky-E'
	})
	],
	exports: [PageTopComponent,
		MapsComponent]
})
export class ComponentsModule { }
