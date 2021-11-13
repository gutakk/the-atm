import { configureStore } from '@reduxjs/toolkit'

import atmReducer from './reducers/atm';
import userReducer from './reducers/user';

const store = configureStore({
  reducer: {
    atm: atmReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
