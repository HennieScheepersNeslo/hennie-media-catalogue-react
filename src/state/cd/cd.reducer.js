import { createSlice } from '@reduxjs/toolkit';
import { state } from 'lit/decorators.js';

const initialState = {
  cds: [],
  loading: false
};

const cdSlice = createSlice({
  name: 'cdSlice',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    loadCDs: () => {
      state.loading = true;
    },

    setCDs: (state, action) => {
      state.cds = action.payload;
      state.loading = true;
    },

    addCD: () => {
      state.loading = true;
    },

    editCD: () => {
      state.loading = true;
    },

    removeCD: () => {
      state.loading = true;
    }
  }
});

export const { loadCDs, setCDs, addCD, setLoading, editCD, removeCD } = cdSlice.actions;

export default cdSlice.reducer;
