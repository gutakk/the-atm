import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  currentBalance: number,
  isLoggedin: boolean,
};

const initialState: UserState = {
  currentBalance: 0,
  isLoggedin: false,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    currentBalance: (state, action: PayloadAction<number>) => {
      state.currentBalance = action.payload;
    },
    isLoggedin: (state, action: PayloadAction<boolean>) => {
      state.isLoggedin = action.payload;
    }
  },
});

export const { currentBalance, isLoggedin } = userReducer.actions;

export default userReducer.reducer;
