import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DataComponent } from './features/data/data.component';
import { CollectionComponent } from './features/collection/collection.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      // {
      //   path: '',
      //   component: DataSourceTypeComponent,
      // },
      {
        path: 'data',
        component: DataComponent,
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
