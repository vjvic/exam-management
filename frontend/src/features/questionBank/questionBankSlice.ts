import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { QuestionBank } from "../../interface/QuestionBank";

interface InitialState {
  questionBankList: QuestionBank[];
  questionBankDet: QuestionBank;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string | unknown;
}

const questionBank = {
  title: "",
  questions: [],
};

const initialState: InitialState = {
  questionBankList: [],
  questionBankDet: questionBank,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const API_URL = "/api/questionbank/";

export const getAllQuestionBank = createAsyncThunk<
  QuestionBank[],
  string,
  { state: RootState }
>(
  "questionBank/getAll",
  async (keyword = "", { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user!.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_URL}?keyword=${keyword}`, config);

      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getQuestionBankDetails = createAsyncThunk<
  QuestionBank,
  string,
  { state: RootState }
>(
  "questionBank/getDetails",
  async (id: string, { getState, rejectWithValue }) => {
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
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const createQuestionBank = createAsyncThunk<
  QuestionBank,
  QuestionBank,
  { state: RootState }
>(
  "questionBank/create",
  async (questionBank: QuestionBank, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user!.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(API_URL, questionBank, config);

      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const deleteQuestionBank = createAsyncThunk<
  any,
  string,
  { state: RootState }
>("questionBank/delete", async (id: string, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.user!.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(API_URL + id, config);

    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return rejectWithValue(message);
  }
});

export const updateQuestionBank = createAsyncThunk<
  any,
  QuestionBank,
  { state: RootState }
>(
  "questionBank/update",
  async (questionBank: QuestionBank, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user!.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        API_URL + questionBank._id,
        questionBank,
        config
      );

      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const questionBankSlice = createSlice({
  name: "questionBank",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllQuestionBank.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllQuestionBank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.questionBankList = action.payload;
      })
      .addCase(getAllQuestionBank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createQuestionBank.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuestionBank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.questionBankList.push(action.payload);
      })
      .addCase(createQuestionBank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteQuestionBank.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuestionBank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.questionBankList = state.questionBankList.filter(
          (questionBank) => questionBank._id !== action.payload.id
        );
      })
      .addCase(deleteQuestionBank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQuestionBankDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestionBankDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.questionBankDet = action.payload;
      })
      .addCase(getQuestionBankDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateQuestionBank.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuestionBank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.questionBankDet = action.payload;
      })
      .addCase(updateQuestionBank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = questionBankSlice.actions;
export default questionBankSlice.reducer;
