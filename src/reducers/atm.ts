import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Notes = {
  'fivePounds': number;
  'tenPounds': number;
  'twentyPounds': number;
}

type AtmState = {
  availableNotes: Notes,
  withdrawAmount: number,
};

const initialState: AtmState = {
  availableNotes: {
    'fivePounds': 4,
    'tenPounds': 15,
    'twentyPounds': 7,
  },
  withdrawAmount: 0,
};

export const atmReducer = createSlice({
  name: 'atm',
  initialState,
  reducers: {
    availableNotes: (state, action: PayloadAction<Notes>) => {
      state.availableNotes = action.payload;
    },
    withdrawAmountAction: (state, action: PayloadAction<number>) => {
      state.withdrawAmount = action.payload;
    },
  },
});

export const { availableNotes, withdrawAmountAction } = atmReducer.actions;

export default atmReducer.reducer;
