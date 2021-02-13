
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from 'parts/Layout';
import LazyLoadingErrorBoundary from 'utils/hocs/LazyLoadingErrorBoundary';
import { PAGES } from 'utils/constants/links';

// TODO: should not use SASS in react development
import './_general.scss';

const Home = React.lazy(() =>
  import(/* webpackChunkName: 'home' */ 'pages/Home')
);

const Chain = React.lazy(() =>
  import(/* webpackChunkName: 'chain' */ 'pages/Chain')
);

const App = () => {
  // TODO: read the chain elements from the lib (smart contract)
  // TODO: display the different block headers/forks

  return (
    <Layout>
      <h1 style={{ textAlign: 'center' }}>
        Bitcoin Fork Explorer
      </h1>
      <React.Suspense fallback='Loading...'>
        <LazyLoadingErrorBoundary>
          <Switch>
            <Route
              path={PAGES.CHAIN}
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
};

export default App;
