import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { PageTopComponent } from './page-top/page-top';

@NgModule({
	declarations: [PageTopComponent],
	imports: [IonicModule.forRoot(ComponentsModule)],
	exports: [PageTopComponent]
})
export class ComponentsModule { }
