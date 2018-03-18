import xs from 'xstream';
import { run } from '@cycle/run';
import { div, makeDOMDriver, input, p, DOMSource } from '@cycle/dom';
import { makeHTTPDriver, HTTPSource } from '@cycle/http';
import { routerify } from 'cyclic-router';
import { makeHistoryDriver } from '@cycle/history';
import switchPath from 'switch-path';

import { BaseSources, BaseSinks } from './interfaces';
import { routes } from './routes';

function main(sources) {
  const match$ = sources.router.define(routes);
  const page$ = match$.map(({ path, value }) => {
    return value.component({ ...sources, props$: sources.router.path(path) });
  });

  return {
    DOM: page$.map(c => c.DOM).flatten(),
    router: xs.of('/other')
  };
}

const mainWithRouting = routerify(main, switchPath);

run(mainWithRouting, {
  DOM: makeDOMDriver('#app'),
  history: makeHistoryDriver()
});
