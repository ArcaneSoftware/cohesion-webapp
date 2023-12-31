import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './common/material.modules';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CollectionComponent } from './features/collection/collection.component';
import { PrimitiveComponent } from './features/primitive/primitive.component';
import { SourceTypeComponent } from './features/source-type/source-type.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { reducer } from './app.reducer';
import { SourceTypeListComponent } from './features/source-type/source-type-list/source-type-list.component';
import { SourceTypeDetailComponent } from './features/source-type/source-type-detail/source-type-detail.component';
import { OperationComponent } from './common/operation/operation.component';
import { AppSettingsService } from './services/app-settings/app-settings.service';

export let CONFIG: any;

export function initializeAppSettings(appSettings: AppSettingsService) {
    return (): Promise<any> => {
        return appSettings.load('assets/app-settings.json');
    };
}

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        HomeComponent,
        CollectionComponent,
        PrimitiveComponent,
        SourceTypeComponent,
        SourceTypeListComponent,
        SourceTypeDetailComponent,
        OperationComponent,
    ],
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
    providers: [AppSettingsService, { provide: APP_INITIALIZER, useFactory: initializeAppSettings, deps: [AppSettingsService], multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule {}
