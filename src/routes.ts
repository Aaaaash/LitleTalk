import { Component } from './interfaces';
import { Login } from './components/Login';
import { NotFoundPage } from './components/NotFoundPage';

export interface RouteValue {
  component: Component;
  scope: string;
}
export interface Routes {
  readonly [index: string]: RouteValue;
}

export const routes: Routes = {
  '/': { component: Login, scope: 'login' },
  '/other': { component: NotFoundPage, scope: 'other' }
};

export const initialRoute = '/';
