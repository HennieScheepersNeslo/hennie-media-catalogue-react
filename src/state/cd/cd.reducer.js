import { createSlice } from '@reduxjs/toolkit';

import { addItem, deleteItem, loadItems, updateItem } from '../../util/state-util';

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

    loadCDsTrigger: () => {
      setLoading(true);
    },
    loadCDs: (state, action) => {
      loadItems(state.cds, action.payload);
      setLoading(false);
    },

    addCDTrigger: () => {
      setLoading(true);
    },
    addCD: (state, action) => {
      addItem(state.cds, action.payload);
      setLoading(false);
    },

    updateCDTrigger: () => {
      setLoading(true);
    },
    updateCD: (state, action) => {
      updateItem(state.cds, action.payload);
      setLoading(false);
    },

    deleteCD: (state, action) => deleteItem(state.cds, action.payload)
  }
});

export const {
  loadCDsTrigger,
  loadCDs,
  addCDTrigger,
  addCD,
  setLoading,
  updateCDTrigger,
  updateCD,
  deleteCD
} = cdSlice.actions;

export default cdSlice.reducer;
