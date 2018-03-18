import xs from 'xstream';
import { run } from '@cycle/run';
import { div, makeDOMDriver, input, p, DOMSource } from '@cycle/dom';
import { makeHTTPDriver, HTTPSource } from '@cycle/http';
import { BaseSources } from '../interfaces';

export function Login(sources: BaseSources) {
  const vdom$ = xs.of(<div>login</div>);
  return {
    DOM: vdom$
  };
}
