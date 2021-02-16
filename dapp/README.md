
## Running

```bash
# install dependencies
$ npm install # Or yarn install

# link the relay lib to this project
$ npm link relay # Or yarn link

# serve with hot reload at localhost:3000
$ npm run start # Or yarn start
```

# Notes from Anton

## Project set-up
  - Established the [project structure](https://dev.to/syakirurahman/react-project-structure-best-practices-for-scalable-application-18kk).
  - Set up [react-router](https://github.com/ReactTraining/react-router) for multi-pages and applied [Route-based code splitting](https://reactjs.org/docs/code-splitting.html#route-based-code-splitting) for performance.
  - Uninstalled [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap), `bootstrap` and `node-sass`, and used `CSS modules` with `CSS variables` for styling because:
    
    * I think the bundle size of `react-bootstrap` is too large for this small project. (Re: https://bundlephobia.com/result?p=react-bootstrap@1.4.3)
    * I think [tailwindcss](https://tailwindcss.com/) or [material-ui](https://github.com/mui-org/material-ui) could be better than `bootstrap`. (Re: [Why I don't use Bootstrap anymore.](https://dev.to/codedgar/why-i-don-t-use-bootstrap-anymore-b8))
    * I think `CSS modules` with `CSS variables` goes well with [component composition](https://reactjs.org/docs/composition-vs-inheritance.html). (Re: [Use CSS Variables instead of React Context](https://epicreact.dev/css-variables/))
    * I think `CSS preprocessors` are generally less useful in `react`-based frontend development. (Re: [Adding a Sass Stylesheet](https://create-react-app.dev/docs/adding-a-sass-stylesheet/))
  - Set up ESLinting based on [eslint-config-react-app](https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app) and [eslint-config-google](https://github.com/google/eslint-config-google) and wired it up with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged).
  - Used absolute import paths. (Re: [Absolute imports with Create React App](https://medium.com/hackernoon/absolute-imports-with-create-react-app-4c6cfb66c35d))

## User experience
  - Styled in dark mode.
  - Considered a long transaction time on Ethereum to apply loading spinners while fetching data from the smart contract.

## TODOs (for production)
  - We should apply [abort-controller](https://gist.github.com/kentcdodds/b36572b6e9227207e6c71fd80e63f3b4). (Re: [Cancelling Fetch](https://academind.com/tutorials/useeffect-abort-http-requests/#cancelling-fetch))
  - We should write tests against the smart contract.
  - We should set up [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) and monitor the bundle size.
  - We should set up [lighthouse-ci](https://github.com/GoogleChrome/lighthouse-ci) and monitor the web performance.
  - We should set up a favicon which is compatible with multiple browsers using [realfavicongenerator](https://realfavicongenerator.net/).
  - We should use [xstate](https://github.com/davidkpiano/xstate). (Re: [Stop using isLoading booleans](https://kentcdodds.com/blog/stop-using-isloading-booleans))
  - We could set up state management using [context](https://reactjs.org/docs/context.html) and caching using [react-query](https://github.com/tannerlinsley/react-query), [apollo-client](https://github.com/apollographql/apollo-client), or [swr](https://github.com/vercel/swr). (Re: [Why I Stopped Using Redux](https://dev.to/g_abud/why-i-quit-redux-1knl), [My State Management Mistake](https://epicreact.dev/my-state-management-mistake/))
  - We could use skeleton UI. (Re: [Implementing Skeleton Screens In React](https://www.smashingmagazine.com/2020/04/skeleton-screens-react/))
  - We could use [quicklink](https://github.com/GoogleChromeLabs/quicklink) if there are a lot of pages.
