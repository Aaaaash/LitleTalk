import xs from 'xstream';
import { run } from '@cycle/run';
import { BaseSources } from '../interfaces';

export function Login(sources: BaseSources) {
  const route$ = sources.DOM.select('.login-btn')
    .events('click')
    .mapTo('/other');

  const vdom$ = xs.of(
    <div>
      <button className="login-btn">login</button>
      <a href="/other">go other</a>
    </div>
  );

  return {
    DOM: vdom$,
    router: route$
  };
}
