import { createSlice } from '@reduxjs/toolkit';

import { setLoading } from '../cd/cd.reducer';

export const initialState = {
  books: [],
  loading: false
};

const bookSlice = createSlice({
  name: 'bookSlice',
  initialState,
  reducers: {
    loadBooks: (state) => {
      state.loading = true;
    },

    setBooks: (state, action) => {
      state.books = action.payload;
      state.loading = false;
    },

    addBook: (state) => {
      state.loading = true;
    },

    editBook: (state) => {
      state.loading = true;
    },

    removeBook: (state) => {
      state.loading = true;
    }
  }
});

export const { loadBooks, setBooks, addBook, editBook, removeBook } = bookSlice.actions;

export default bookSlice.reducer;
