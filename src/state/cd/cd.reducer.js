import { createSlice } from '@reduxjs/toolkit';

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

    loadCDs: (state) => {
      state.loading = true;
    },

    setCDs: (state, action) => {
      state.cds = action.payload;
      state.loading = true;
    },

    addCD: (state) => {
      state.loading = true;
    },

    editCD: (state) => {
      state.loading = true;
    },

    removeCD: (state) => {
      state.loading = true;
    }
  }
});

export const { loadCDs, setCDs, addCD, setLoading, editCD, removeCD } = cdSlice.actions;

export default cdSlice.reducer;
