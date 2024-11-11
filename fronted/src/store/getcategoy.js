import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching fussion products
export const fetchFussion = createAsyncThunk(
  'category/fetchFussion',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8989/product/fussion');
      return response.data; // Adjust based on the actual response structure
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching beauty products
export const fetchBeauty = createAsyncThunk(
  'category/fetchBeauty',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8989/product/beauty');
      return response.data; // Adjust based on the actual response structure
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice for managing category data
export const getCategory = createSlice({
  name: "category",
  initialState: {
    fussion: [],
    beauty: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fussion product actions
      .addCase(fetchFussion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFussion.fulfilled, (state, action) => {
        state.loading = false;
        state.fussion = action.payload;
      })
      .addCase(fetchFussion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling beauty product actions
      .addCase(fetchBeauty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBeauty.fulfilled, (state, action) => {
        state.loading = false;
        state.beauty = action.payload;
      })
      .addCase(fetchBeauty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getCategory.reducer;
