import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type searchState = {
  search: any | null;
  searchByTag: any | null;
};

export const searchSlice = createSlice({
  name: "search",
  initialState: { search: [], searchByTag: null } as searchState,
  reducers: {
    getSearch: (state, action: PayloadAction<any>) => {
      state.search = action.payload.data.data.posts;
      console.log(state.search)
    },
    getSearchTitle: (state, action: PayloadAction<any>) => {
      state.searchByTag = action.payload.data.data.posts
      // console.log(state.searchByTag)
    }
  },
});

export const { getSearch, getSearchTitle } = searchSlice.actions;
export default searchSlice.reducer;
