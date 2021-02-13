
const URL_PARAMS = Object.freeze({
  ID: 'id',
  START_HEIGHT: 'startHeight',
  CURRENT_HEIGHT: 'currentHeight'
});

const PAGES = Object.freeze({
  HOME: '/',
  CHAIN: `/chain/:${URL_PARAMS.ID}`
});

export {
  PAGES,
  URL_PARAMS
};
