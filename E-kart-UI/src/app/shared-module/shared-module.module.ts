import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatInputModule, MatCardModule, MatBadgeModule, MatRippleModule, MatDividerModule, MatMenuModule, MatSnackBarModule, MatTooltipModule, MatRadioModule, MatExpansionModule, MatGridListModule, MatFormFieldModule, MatSelectModule, MatStepperModule, MatDialogModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {SlideshowModule} from 'ng-simple-slideshow';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingModule } from 'angular-star-rating';
import { NgxGalleryModule } from 'ngx-gallery';
import 'hammerjs';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    
    LayoutModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    FlexLayoutModule,
    MatCardModule,
    MatStepperModule,
    MatBadgeModule,
    MatRippleModule,
    NgxGalleryModule,
    HttpClientModule,
    MatDividerModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatRadioModule,
    SlideshowModule,
    StarRatingModule 
  ]
})
export class SharedModuleModule { }
