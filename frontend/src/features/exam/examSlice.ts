import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { Exam } from "../../interface/Exam";

interface InitialState {
  examList: Exam[];
  examDet: Exam;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string | unknown;
}

const exam = {
  title: "",
  description: "",
  timeLimit: 0,
  dateAndTime: { from: null, to: null },
  code: "",
  questions: [],
};

const initialState: InitialState = {
  examList: [],
  examDet: exam,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const API_URL = "/api/exam/";

export const getAllExam = createAsyncThunk<
  Exam[],
  undefined,
  { state: RootState }
>("exam/getAll", async (_, { getState, rejectWithValue }) => {
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

export const getExamDetails = createAsyncThunk<
  Exam,
  string,
  { state: RootState }
>("exam/getDetails", async (id: string, { getState, rejectWithValue }) => {
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

export const createExam = createAsyncThunk<Exam, Exam, { state: RootState }>(
  "post/create",
  async (exam: Exam, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user!.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(API_URL, exam, config);

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

export const deleteExam = createAsyncThunk<any, string, { state: RootState }>(
  "exam/delete",
  async (id: string, { getState, rejectWithValue }) => {
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
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const updateExam = createAsyncThunk<any, Exam, { state: RootState }>(
  "exam/update",
  async (exam: Exam, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user!.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(API_URL + exam._id, exam, config);

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

export const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllExam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllExam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.examList = action.payload;
      })
      .addCase(getAllExam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createExam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.examList.push(action.payload);
      })
      .addCase(createExam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteExam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.examList = state.examList.filter(
          (exam) => exam._id !== action.payload.id
        );
      })
      .addCase(deleteExam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getExamDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExamDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.examDet = action.payload;
      })
      .addCase(getExamDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateExam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.examDet = action.payload;
      })
      .addCase(updateExam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = examSlice.actions;
export default examSlice.reducer;
