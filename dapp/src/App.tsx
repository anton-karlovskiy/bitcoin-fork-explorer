
import * as React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import Layout from 'parts/Layout';
import Loader from 'components/Loader';
import LazyLoadingErrorBoundary from 'utils/hocs/LazyLoadingErrorBoundary';
import {
  PAGES,
  URL_PARAMS
} from 'utils/constants/links';
import './app.css';

const Home = React.lazy(() =>
  import(/* webpackChunkName: 'home' */ 'pages/Home')
);

const Chain = React.lazy(() =>
  import(/* webpackChunkName: 'chain' */ 'pages/Chain')
);

/**
 * TODO:
 * Could add a router guard to validate start_height and current_height against Chain page.
 */

const App = () => (
  <Layout>
    <React.Suspense fallback={<Loader centerViewport />}>
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
