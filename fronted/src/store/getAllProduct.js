import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";  // Make sure Axios is installed and imported

// Async thunk to fetch all products
export const fetchallProduct = createAsyncThunk(
  'allproduct/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8989/product');
      return response.data
       // Adjust this based on the structure of your response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const allProduct = createSlice({
  name: "allproduct",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchallProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchallProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchallProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default allProduct.reducer;
