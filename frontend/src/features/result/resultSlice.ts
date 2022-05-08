import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
/* import { Question } from "../../interface/Question"; */
import { Result } from "../../interface/Result";

interface InitialState {
  resultList: Result[];
  resultDet: Result | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string | unknown;
}

const initialState: InitialState = {
  resultList: [],
  resultDet: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const API_URL = "/api/result/";

export const getAllResult = createAsyncThunk<
  Result[],
  undefined,
  { state: RootState }
>("result/getAll", async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.user!.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL, config);

    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return rejectWithValue(message);
  }
});

export const getResultDetails = createAsyncThunk<
  Result,
  string,
  { state: RootState }
>("result/getDetails", async (id: string, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.user!.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL + id, config);

    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return rejectWithValue(message);
  }
});

export const createResult = createAsyncThunk<
  Result,
  Result,
  { state: RootState }
>("result/create", async (result: Result, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.user!.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_URL, result, config);

    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return rejectWithValue(message);
  }
});

export const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.resultList = action.payload;
      })
      .addCase(getAllResult.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.resultList.push(action.payload);
      })
      .addCase(createResult.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getResultDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getResultDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.resultDet = action.payload;
      })
      .addCase(getResultDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = resultSlice.actions;
export default resultSlice.reducer;
