import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Notes = {
  'fivePounds': number;
  'tenPounds': number;
  'twentyPounds': number;
}

type AtmState = {
  availableNotes: Notes,
};

const initialState: AtmState = {
  availableNotes: {
    'fivePounds': 4,
    'tenPounds': 15,
    'twentyPounds': 7
  },
};

export const atmReducer = createSlice({
  name: 'atm',
  initialState,
  reducers: {
    availableNotes: (state, action: PayloadAction<Notes>) => {
      state.availableNotes = action.payload;
    },
  },
});

export const { availableNotes } = atmReducer.actions;

export default atmReducer.reducer;
