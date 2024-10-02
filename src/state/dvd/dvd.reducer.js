import { ADD_DVD, DELETE_DVD, UPDATE_DVD } from './dvd.action';

const initialState = {
  dvds: []
};

let nextID = 1;

const dvdReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DVD:
      return { ...state, dvds: [...state.dvds, { ...action.payload, id: nextID++ }] };

    case UPDATE_DVD:
      return {
        ...state,
        dvds: state.dvds.map((dvd) => (dvd.id === action.payload.id ? action.payload.newDVD : dvd))
      };

    case DELETE_DVD:
      return { ...state, dvds: state.dvds.filter((dvd) => dvd.id !== action.payload) };

    default:
      return state;
  }
};

export default dvdReducer;
