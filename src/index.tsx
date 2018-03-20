import xs from 'xstream';
import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { routerify } from 'cyclic-router';
import { makeHistoryDriver } from '@cycle/history';
import switchPath from 'switch-path';

import { BaseSources, BaseSinks } from './interfaces';
import { routes, RouteValue, initialRoute } from './routes';

function main(sources: BaseSources) {
  const match$ = sources.router.define(routes);
  const page$ = match$.map(
    ({ path, value }: { path: any; value: RouteValue }) => {
      return value.component({ ...sources, router: sources.router.path(path) });
    }
  );

  return {
    DOM: page$.map((c: BaseSinks) => c.DOM).flatten(),
    router: xs.of(initialRoute)
  };
}

const mainWithRouting = routerify(main, switchPath);

run(mainWithRouting, {
  DOM: makeDOMDriver('#app'),
  history: makeHistoryDriver()
});
