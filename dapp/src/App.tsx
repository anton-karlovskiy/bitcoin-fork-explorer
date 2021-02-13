
import * as React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import Layout from 'parts/Layout';
import LazyLoadingErrorBoundary from 'utils/hocs/LazyLoadingErrorBoundary';
import {
  PAGES,
  URL_PARAMS
} from 'utils/constants/links';

// TODO: should not use SASS in react development
import './_general.scss';

const Home = React.lazy(() =>
  import(/* webpackChunkName: 'home' */ 'pages/Home')
);

const Chain = React.lazy(() =>
  import(/* webpackChunkName: 'chain' */ 'pages/Chain')
);

/**
 * TODO:
 * Read the chain elements from the lib (smart contract).
 * Display the different block headers/forks.
 * Could add a router guard to validate start_height and current_height against Chain page.
 */

const App = () => (
  <Layout>
    <React.Suspense fallback='Loading...'>
      <LazyLoadingErrorBoundary>
        <Switch>
          <Route
            path={`${PAGES.CHAIN}/:${URL_PARAMS.ID}`}
            component={Chain} />
          <Route
            exact
            path={PAGES.HOME}
            component={Home} />
        </Switch>
      </LazyLoadingErrorBoundary>
    </React.Suspense>
  </Layout>
);

export default App;
