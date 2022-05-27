import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

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
  User,
  ExamResult,
} from "./pages";
import { createTheme } from "@mui/material/styles";
import { useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";

/* declare module "@mui/material/styles" {
  interface Theme {
    paletteOptions: {
      type: string;
      primary: {
        main?: string;
      };
      secondary: {
        main: string;
      };
      background: {
        default: string;
      };
    };
    Components: {
      MuiAppBar: {
        elevation: number;
        color: string;
      };
      MuiButton: {
        disableRipple: boolean;
        disableElevation: boolean;
      };
      MuiCard: {
        raised: boolean;
        elevation: number;
      };
      MuiPaper: {
        elevation: number;
      };
    };
    overrides: {
      MuiAppBar: {
        colorInherit: {
          backgroundColor: string;
          color: string;
        };
      };
    };
    shape: {
      borderRadius: number;
    };
  } */

// allow configuration using `createTheme`
interface ThemeOptions {
  paletteOptions?: {
    type?: string;
    primary?: {
      main?: string;
    };
    secondary?: {
      main?: string;
    };
    background?: {
      default?: string;
    };
  };
  Components?: {
    MuiAppBar?: {
      elevation?: number;
      color?: string;
    };
    MuiButton?: {
      disableRipple?: boolean;
      disableElevation?: boolean;
    };
    MuiCard?: {
      raised?: boolean;
      elevation: number;
    };
    MuiPaper?: {
      elevation?: number;
    };
  };
  overrides?: {
    MuiAppBar?: {
      colorInherit?: {
        backgroundColor?: string;
        color?: string;
      };
    };
  };
  shape?: {
    borderRadius?: number;
  };
}

const App = () => {
  const { settings, isLoading } = useAppSelector(
    (state: RootState) => state.settings
  );

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

  const examResultRoute = (
    <FacultyRoute>
      <ExamResult />
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

  const userRoute = (
    <FacultyRoute>
      <User />
    </FacultyRoute>
  );

  const themeOptions: ThemeOptions = createTheme({
    palette: {
      primary: {
        main: settings.color,
      },
      secondary: {
        main: "#F75A54",
      },
      background: {
        default: "#F5F5F5",
      },
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          elevation: 1,
          color: "primary",
        },
      },
      MuiButton: {
        defaultProps: {
          /* disableRipple: true, */
          /* disableElevation: true, */
        },
      },
      MuiCard: {
        defaultProps: {
          raised: false,
          elevation: 1,
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 1,
        },
      },
    },
    overrides: {
      MuiAppBar: {
        colorInherit: {
          color: "#333",
        },
      },
    },
    shape: {
      borderRadius: 5,
    },
  });

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
          <Route path="/exam-result/:id" element={examResultRoute} />
          <Route path="/profile" element={profileRoute} />
          <Route path="/home" element={homeRoute} />
          <Route path="/score" element={scoreRoute} />
          <Route path="/start-exam" element={startExamRoute} />
          <Route path="/users" element={userRoute} />
          <Route path="/" element={dashboardRoute} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
