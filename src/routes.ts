import { Component } from './interfaces';
import Login from './components/Login';

export interface RouteValue {
  component: Component;
  scope: string;
}
export interface Routes {
  readonly [index: string]: RouteValue;
}

export const routes: Routes = {
  '/': { component: Login, scope: 'login' },
};

export const initialRoute = '/';
