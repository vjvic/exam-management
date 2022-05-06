import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import examReducer from "../features/exam/examSlice";
import questionBankReducer from "../features/questionBank/questionBankSlice";
import questionReducer from "../features/question/question";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exam: examReducer,
    questionBank: questionBankReducer,
    question: questionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
