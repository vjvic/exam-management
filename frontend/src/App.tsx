import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { themeOptions } from "./theme";
import { Layout, PrivateRoute, FacultyRoute } from "./components";
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
  Result,
  ResultDetails,
  Profile,
  Home,
  Score,
  StartExam,
  Dashboard,
} from "./pages";

const App = () => {
  const examRoute = (
    <FacultyRoute>
      <Exam />
    </FacultyRoute>
  );

  const examFormRoute = (
    <FacultyRoute>
      <ExamForm />
    </FacultyRoute>
  );

  const examDetailsRoute = (
    <FacultyRoute>
      <ExamDetails />
    </FacultyRoute>
  );

  const questionBankRoute = (
    <FacultyRoute>
      <QuestionBank />
    </FacultyRoute>
  );

  const questionBankFormRoute = (
    <FacultyRoute>
      <QuestionBankForm />
    </FacultyRoute>
  );

  const questionsRoute = (
    <FacultyRoute>
      <Questions />
    </FacultyRoute>
  );

  const questionFormRoute = (
    <FacultyRoute>
      <QuestionForm />
    </FacultyRoute>
  );

  const resultsRoute = (
    <FacultyRoute>
      <Result />
    </FacultyRoute>
  );

  const resultsDetailsRoute = (
    <FacultyRoute>
      <ResultDetails />
    </FacultyRoute>
  );

  const profileRoute = (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  );

  const homeRoute = (
    <PrivateRoute>
      <Home />
    </PrivateRoute>
  );

  const scoreRoute = (
    <PrivateRoute>
      <Score />
    </PrivateRoute>
  );

  const startExamRoute = (
    <PrivateRoute>
      <StartExam />
    </PrivateRoute>
  );

  const dashboardRoute = (
    <FacultyRoute>
      <Dashboard />
    </FacultyRoute>
  );

  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/exam" element={examRoute} />
          <Route path="/exam/edit/" element={examFormRoute} />
          <Route path="/exam/edit/:id" element={examFormRoute} />
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
          <Route path="/results-details/:id" element={resultsDetailsRoute} />
          <Route path="/profile" element={profileRoute} />
          <Route path="/home" element={homeRoute} />
          <Route path="/score" element={scoreRoute} />
          <Route path="/start-exam" element={startExamRoute} />
          <Route path="/" element={dashboardRoute} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
