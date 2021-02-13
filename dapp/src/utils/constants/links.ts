
const URL_PARAMS = Object.freeze({
  ID: 'id'
});

const PAGES = Object.freeze({
  HOME: '/',
  CHAIN: `/chain/:${URL_PARAMS.ID}`
});

export {
  PAGES,
  URL_PARAMS
};
