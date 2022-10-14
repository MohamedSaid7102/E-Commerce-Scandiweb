// Just change this, and incase you are in dev mode run npm run start on server, it will run on port 4000, you can find graphQL code in my repo:

// https://github.com/MohamedSaid7102/reactjs---e-commerce-scandiweb.inc

export const IS_DEV_MODE = false;
// TODO: Add your github repo link in the header

export const PORT = IS_DEV_MODE
  ? 'http://localhost:4000/'
  : 'https://scandiweb-server-shelf.herokuapp.com/';
