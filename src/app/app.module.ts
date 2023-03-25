import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageComponent} from '@pages/main-page/main-page.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SideBarComponent} from '@components/ui/side-bar/side-bar.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {CardComponent} from '@components/ui/card/card.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatSliderModule} from "@angular/material/slider";
import {DoubleSliderComponent} from '@components/ui/double-slider/double-slider.component';
import {PageComponent} from '@components/ui/page/page.component';
import {ModalBodyComponent} from '@components/modals/modal-body/modal-body.component';
import {ModalBookComponent} from '@components/modals/modal-book/modal-book.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ModalHeaderComponent} from '@components/modals/modal-header/modal-header.component';
import {ModalCreateBookComponent} from '@components/modals/modal-create-book/modal-create-book.component';
import { ModalAuthorComponent } from '@components/modals/modal-author/modal-author.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SideBarComponent,
    CardComponent,
    DoubleSliderComponent,
    PageComponent,
    ModalBodyComponent,
    ModalBookComponent,
    ModalHeaderComponent,
    ModalCreateBookComponent,
    ModalCreateBookComponent,
    ModalAuthorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSliderModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
