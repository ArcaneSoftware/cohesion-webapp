import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrimitiveComponent } from './features/primitive/primitive.component';
import { CollectionComponent } from './features/collection/collection.component';
import { SourceComponent } from './features/source/source.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'source',
        component: SourceComponent,
      },
      {
        path: 'primitive',
        component: PrimitiveComponent,
      },
      {
        path: 'collection',
        component: CollectionComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
