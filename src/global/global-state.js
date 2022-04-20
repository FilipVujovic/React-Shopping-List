import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { id: "", name: "", items: [], shop: {} };

const listSlice = createSlice({
  name: "list-slice",
  initialState,
  reducers: {
    setListState(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.items = action.payload.items;
      state.shop = action.payload.shop;
    },
  },
});

const store = configureStore({
  reducer: { list: listSlice.reducer },
});

export const listActions = listSlice.actions;
export default store;
