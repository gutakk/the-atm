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
    currentBalanceAction: (state, action: PayloadAction<number>) => {
      state.currentBalance = action.payload;
    },
    isLoggedinAction: (state, action: PayloadAction<boolean>) => {
      state.isLoggedin = action.payload;
    }
  },
});

export const { currentBalanceAction, isLoggedinAction } = userReducer.actions;

export default userReducer.reducer;
