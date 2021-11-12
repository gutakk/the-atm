import { configureStore } from '@reduxjs/toolkit'
import atm from './reducers/atm';
import atmReducer from './reducers/atm';
import userReducer from './reducers/user';

const store = configureStore({
  reducer: {
    atm: atm,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
