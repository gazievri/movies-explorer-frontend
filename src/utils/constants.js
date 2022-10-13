const MOVIE_URL = 'https://api.nomoreparties.co';
const MAIN_API = 'https://api.movie.gazievri.nomoredomains.sbs';
const REGEXP_EMAIL = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const REGEXP_NAME = /[a-zа-я\- ]/gmi;
const SHORT_MOVIES_LENGTH = 40;
const MOVIES_PER_PAGE_SIZE_MORE_1280 = 12;
const MOVIES_PER_PAGE_SIZE_761_1279 = 8;
const MOVIES_PER_PAGE_SIZE_LESS_761 = 5;
const MOVIES_BTN_ADD_SIZE_MORE_1280 =3;
const MOVIES_BTN_ADD_SIZE_LESS_1279 =2;

export {
  MOVIE_URL,
  REGEXP_EMAIL,
  MAIN_API,
  REGEXP_NAME,
  SHORT_MOVIES_LENGTH,
  MOVIES_PER_PAGE_SIZE_MORE_1280,
  MOVIES_PER_PAGE_SIZE_761_1279,
  MOVIES_PER_PAGE_SIZE_LESS_761,
  MOVIES_BTN_ADD_SIZE_MORE_1280,
  MOVIES_BTN_ADD_SIZE_LESS_1279,
};
