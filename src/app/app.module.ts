import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material.modules';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CollectionComponent } from './features/collection/collection.component';
import { PrimitiveComponent } from './features/primitive/primitive.component';
import { SourceComponent } from './features/source/source.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { reducer } from './app.reducer';
import { SourceTypeListComponent } from './features/source/source-type-list/source-type-list.component';
import { SourceTypeDetailComponent } from './features/source/source-type-detail/source-type-detail.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, HomeComponent, CollectionComponent, PrimitiveComponent, SourceComponent, SourceTypeListComponent, SourceTypeDetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot(reducer, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: false,
        strictActionSerializability: false,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
