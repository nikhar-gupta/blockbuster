import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    popularMovies: [],
    searchMovies: [],
  },
  reducers: {
    addPopularMovies: (state, action) => {
      const combined = [...state.popularMovies, ...action.payload];
      const uniqueMovies = Array.from(
        new Map(combined.map((movie) => [movie.id, movie])).values()
      );
      state.popularMovies = uniqueMovies;
    },
    addSearchMovies: (state, action) => {
      state.searchMovies = action.payload;
    },
  },
});

export const { addPopularMovies, addSearchMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
