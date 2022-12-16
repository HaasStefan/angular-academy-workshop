import { Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';
import { FlightLookaheadComponent } from './flight-lookahead/flight-lookahead.component';
import { defer, map, retry } from 'rxjs';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'basket',
    component: BasketComponent,
    outlet: 'aux',
  },
  {
    path: 'flight-booking',
    loadChildren: () => defer(() => import('./flight-booking/flight-booking.module')).pipe(
      map(m => m.FlightBookingModule),
      retry(3)
    ),
    data: {
      preload: true
    }
    // loadChildren: async () => (await import('./flight-booking/flight-booking.module')).FlightBookingModule
    // loadChildren: () => import('./flight-booking/flight-booking.module').then(m => m.FlightBookingModule)
  },
  {
    path: 'passenger',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module', // >=13 --> es module, commonjs,
        remoteEntry: 'http://localhost:3000/remoteEntry.js',
        exposedModule: './Module',
      }).then((m) => m.PassengerModule),
    //import('passenger/Module').then(m => m.PassengerModule)
  },
  {
    path: 'react',
    component: WebComponentWrapper,
    data: {
      remoteEntry:
        'https://witty-wave-0a695f710.azurestaticapps.net/remoteEntry.js',
      remoteName: 'react',
      exposedModule: './web-components',
      elementName: 'react-element',
    } as WebComponentWrapperOptions,
  },
  {
    path: 'flight-lookahead',
    component: FlightLookaheadComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
