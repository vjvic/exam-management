import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { Question } from "../../interface/Question";

interface InitialState {
  questionList: Question[];
  questionDet: Question;
  questionRandom: Question[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string | unknown;
}

const question = {
  questionText: "",
  choices: [{ text: "" }],
  answer: "",
  point: 0,
  cpd: "",
  kd: "",
};

const initialState: InitialState = {
  questionList: [],
  questionDet: question,
  questionRandom: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const API_URL = "/api/question/";

export const getAllQuestion = createAsyncThunk<
  Question[],
  undefined,
  { state: RootState }
>("question/getAll", async (_, { getState, rejectWithValue }) => {
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

export const getRandomQuestion = createAsyncThunk<
  Question[],
  { size: number; id: string },
  { state: RootState }
>(
  "question/getRandom",
  async (
    question: { size: number; id: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = getState().auth.user!.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${API_URL}random/${question.id}?size=${question.size}`,
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

export const getQuestionByQuestionBank = createAsyncThunk<
  Question[],
  string,
  { state: RootState }
>(
  "question/getByQuestionBank",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user!.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(API_URL + `/qbquestion/${id}`, config);

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

export const getQuestionDetails = createAsyncThunk<
  Question,
  string,
  { state: RootState }
>("question/getDetails", async (id: string, { getState, rejectWithValue }) => {
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

export const createQuestion = createAsyncThunk<
  Question,
  Question,
  { state: RootState }
>(
  "question/create",
  async (question: Question, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user!.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(API_URL, question, config);

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

export const deleteQuestion = createAsyncThunk<
  any,
  string,
  { state: RootState }
>("question/delete", async (id: string, { getState, rejectWithValue }) => {
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

export const updateQuestion = createAsyncThunk<
  any,
  Question,
  { state: RootState }
>(
  "question/update",
  async (question: Question, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user!.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        API_URL + question._id,
        question,
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

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.questionList = action.payload;
      })
      .addCase(getAllQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRandomQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRandomQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.questionRandom = [...state.questionRandom, ...action.payload];
      })
      .addCase(getRandomQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQuestionByQuestionBank.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestionByQuestionBank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.questionList = action.payload;
      })
      .addCase(getQuestionByQuestionBank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.questionList.push(action.payload);
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.questionList = state.questionList.filter(
          (question) => question._id !== action.payload.id
        );
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQuestionDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestionDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.questionDet = action.payload;
      })
      .addCase(getQuestionDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.questionDet = action.payload;
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = questionSlice.actions;
export default questionSlice.reducer;
