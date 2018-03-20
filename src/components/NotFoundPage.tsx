import xs from 'xstream';
import { run } from '@cycle/run';
import { BaseSources } from '../interfaces';

export function NotFoundPage(sources: BaseSources) {
  const routes$ = sources.DOM.select('.404-btn')
    .events('click')
    .mapTo('/');

  const vdom$ = xs.of(
    <div>
      <button className="404-btn">this is 404 page!</button>
    </div>
  );

  return {
    DOM: vdom$,
    router: routes$
  };
}
