import xs from 'xstream';
import {run} from '@cycle/run';
import {div, makeDOMDriver, input, p, DOMSource} from '@cycle/dom';
import {makeHTTPDriver, HTTPSource} from '@cycle/http';

import { BaseSources, BaseSinks } from './interfaces';

type UserData = {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string,
    },
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string,
  },
};

function main(sources: { DOM: DOMSource, HTTP: HTTPSource }) {
  const getRandomUsers$ = sources.DOM.select('.get-random').events('click')
    .map(() => {
      const randomNum = Math.round(Math.random() * 9) + 1;
      return {
        url: 'https://jsonplaceholder.typicode.com/users/' + String(randomNum),
        category: 'users',
        method: 'GET',
      };
    });

  const user$ = sources.HTTP.select('users')
    .flatten()
    .map(res => res.body as UserData)
    .startWith(null);

  const vdom$ = user$.map((user) => (
    <div className="users">
      <button className="get-random">Get random user</button>
      {user !== null && <div calssName="user-details">
        <h1>{user.name}</h1>
        <h4>{user.email}</h4>
        <a href={user.website}>{user.website}</a>
      </div>}
    </div>
  ));

  return {
    DOM: vdom$,
    HTTP: getRandomUsers$,
  };
}


run(main, {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
});
