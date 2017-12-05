import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { NgPipesModule } from 'ng-pipes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	MatAutocompleteModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCardModule,
	MatCheckboxModule,
	MatChipsModule,
	MatDatepickerModule,
	MatDialogModule,
	MatExpansionModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatNativeDateModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatRippleModule,
	MatSelectModule,
	MatSidenavModule,
	MatSliderModule,
	MatSlideToggleModule,
	MatSnackBarModule,
	MatSortModule,
	MatTableModule,
	MatTabsModule,
	MatToolbarModule,
	MatTooltipModule,
	MatStepperModule,
} from '@angular/material';

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
		BrowserAnimationsModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatCheckboxModule,
		MatChipsModule,
		MatDatepickerModule,
		MatDialogModule,
		MatExpansionModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatRippleModule,
		MatSelectModule,
		MatSidenavModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatSortModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule,
		MatTooltipModule,
		MatStepperModule,
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
