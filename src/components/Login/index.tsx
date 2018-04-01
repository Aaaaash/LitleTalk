import xs from 'xstream';
import { run } from '@cycle/run';
import { BaseSources } from '../../interfaces';

export default function Login(sources: BaseSources) {
  const route$ = sources.DOM.select('.login-btn')
    .events('click')
    .mapTo('/other');

  const vdom$ = xs.of(
    <div className="login-container">
      <section className="login-info">
        <p className="from-p">
          <span className="from-label">AuthName:</span>
          <input type="text" className="from-input" />
        </p>
        <p className="from-p">
          <span className="from-label">PassWord:</span>
          <input type="password" className="from-input" />
        </p>
        <p className="from-p">
          <button className="from-button">
            login
          </button>
        </p>
      </section>
    </div>
  );

  return {
    DOM: vdom$,
    router: route$
  };
}
