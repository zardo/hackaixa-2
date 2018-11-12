import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent, InicioDialogComponent, ParabensDialogComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatInputModule, MatListModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent, InicioDialogComponent, ParabensDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: 'teste'}],
  bootstrap: [AppComponent],
  entryComponents: [InicioDialogComponent, ParabensDialogComponent]
})
export class AppModule {
}
