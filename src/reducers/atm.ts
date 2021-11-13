import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Notes = {
  '5': number;
  '10': number;
  '20': number;
}

type AtmState = {
  availableNotes: Notes,
  withdrawAmount: number,
};

const initialState: AtmState = {
  availableNotes: {
    '5': 4,
    '10': 15,
    '20': 7,
  },
  withdrawAmount: 0,
};

export const atmReducer = createSlice({
  name: 'atm',
  initialState,
  reducers: {
    availableNotesAction: (state, action: PayloadAction<Notes>) => {
      state.availableNotes = action.payload;
    },
    withdrawAmountAction: (state, action: PayloadAction<number>) => {
      state.withdrawAmount = action.payload;
    },
  },
});

export const { availableNotesAction, withdrawAmountAction } = atmReducer.actions;

export default atmReducer.reducer;
