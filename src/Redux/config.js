// Just change this
export const DEV_MODE = true;
export const PROD_MODE = !DEV_MODE;

export const PORT = DEV_MODE
  ? 'http://localhost:4000/'
  : 'https://scandiweb-server-shelf.herokuapp.com/';
