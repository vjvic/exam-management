import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { themeOptions } from "./theme";
import { Layout, PrivateRoute } from "./components";
import { Routes, Route } from "react-router-dom";
import {
  Signin,
  Signup,
  Exam,
  ExamForm,
  ExamDetails,
  QuestionBank,
  QuestionBankForm,
  Questions,
  QuestionForm,
  Results,
  Profile,
} from "./pages";

const App = () => {
  const examRoute = (
    <PrivateRoute>
      <Exam />
    </PrivateRoute>
  );

  const examFormRoute = (
    <PrivateRoute>
      <ExamForm />
    </PrivateRoute>
  );

  const examDetailsRoute = (
    <PrivateRoute>
      <ExamDetails />
    </PrivateRoute>
  );

  const questionBankRoute = (
    <PrivateRoute>
      <QuestionBank />
    </PrivateRoute>
  );

  const questionBankFormRoute = (
    <PrivateRoute>
      <QuestionBankForm />
    </PrivateRoute>
  );

  const questionsRoute = (
    <PrivateRoute>
      <Questions />
    </PrivateRoute>
  );

  const questionFormRoute = (
    <PrivateRoute>
      <QuestionForm />
    </PrivateRoute>
  );

  const resultsRoute = (
    <PrivateRoute>
      <Results />
    </PrivateRoute>
  );

  const profileRoute = (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  );

  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={examRoute} />
          <Route path="/edit/" element={examFormRoute} />
          <Route path="/edit/:id" element={examFormRoute} />
          <Route path="/exam-details/:id" element={examDetailsRoute} />
          <Route path="/questionbank" element={questionBankRoute} />
          <Route path="/questionbank/edit/" element={questionBankFormRoute} />
          <Route
            path="/questionbank/edit/:id"
            element={questionBankFormRoute}
          />
          <Route path="/questions/edit/" element={questionFormRoute} />
          <Route path="/questions/edit/:bank" element={questionFormRoute} />
          <Route path="/questions/edit/:bank/:id" element={questionFormRoute} />
          <Route path="/questions/" element={questionsRoute} />
          <Route path="/questions/:id" element={questionsRoute} />
          <Route path="/results" element={resultsRoute} />
          <Route path="/profile" element={profileRoute} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
