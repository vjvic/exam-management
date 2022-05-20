import { Typography, Paper, Grid } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ArticleIcon from "@mui/icons-material/Article";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useEffect } from "react";
import { RootState } from "../app/store";
import { getAllExam, reset } from "../features/exam/examSlice";
import { getAllUser, reset as userReset } from "../features/auth/authSlice";
import { PieChart, Loader, Error } from "../components";
import {
  getAllQuestion,
  reset as questionReset,
} from "../features/question/question";

const Dashboard = () => {
  //Redux hooks
  const dispatch = useAppDispatch();
  const { userList, isLoading, isError } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { examList } = useAppSelector((state: RootState) => state.exam);
  const { questionList } = useAppSelector((state: RootState) => state.question);

  //Total faculty
  const totalFaculty = userList.filter(
    (user) => user.role === "faculty"
  ).length;

  //Total student
  const totalStudent = userList.filter(
    (user) => user.role === "student"
  ).length;

  //Total exam
  const totalExam = examList.length;

  // kd --> factual conceptual procedural metacognitive
  // cpd --> remember understand apply analyze evaluate create

  const kDimensionLabel = [
    "Factual",
    "Conceptual",
    "Procedural",
    "Metacognitive",
  ];
  const cpDimensionLabel = [
    "Remember",
    "Understand",
    "Apply",
    "Analyze",
    "Evaluate",
    "Create",
  ];

  const filterKDimension = (kDimension: string) => {
    return questionList.filter((question) => question.kd === kDimension).length;
  };

  const filterCpDimension = (cpDimension: string) => {
    return questionList.filter((question) => question.cpd === cpDimension)
      .length;
  };

  let kdData: number[] = [];
  let cpdData: number[] = [];

  for (let i = 0; i < kDimensionLabel.length; i++) {
    kdData.push(filterKDimension(kDimensionLabel[i]));
  }

  for (let i = 0; i < cpDimensionLabel.length; i++) {
    cpdData.push(filterCpDimension(cpDimensionLabel[i]));
  }

  /*   kDimensionLabel.map((kd) => {
    kdData.push(filterKDimension(kd));
  });

  cpDimensionLabel.map((cpd) => {
    cpdData.push(filterCpDimension(cpd));
  }); */

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllExam());
    dispatch(getAllQuestion());

    return () => {
      dispatch(reset());
      dispatch(userReset());
      dispatch(questionReset());
    };
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div style={{marginTop:50}}>
      <Typography variant="h4" mb={3}>
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gridGap: "1rem",
              p: 3,
              borderBottom: "2px solid #2196F3",
            }}
          >
            <div>
              <PeopleAltIcon fontSize="large" />
            </div>
            <div>
              <Typography fontWeight="bold">{totalFaculty}</Typography>
              <Typography color="text.secondary">Total Teacher</Typography>
            </div>
          </Paper>
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gridGap: "1rem",
              p: 3,
              borderBottom: "2px solid #F50057",
            }}
          >
            <div>
              <SchoolIcon fontSize="large" />
            </div>
            <div>
              <Typography fontWeight="bold">{totalStudent}</Typography>
              <Typography color="text.secondary">Total Student</Typography>
            </div>
          </Paper>
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gridGap: "1rem",
              p: 3,
              borderBottom: "2px solid #76ff03",
            }}
          >
            <div>
              <ArticleIcon fontSize="large" />
            </div>
            <div>
              <Typography fontWeight="bold">{totalExam}</Typography>
              <Typography color="text.secondary">Total Exam</Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 5 }}>
        <Grid item lg={6} sm={12}>
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              mb={2}
              fontWeight="bold"
              textAlign="center"
            >
              Knowledge Dimension
            </Typography>
            <PieChart chartLabel={kDimensionLabel} chartData={kdData} />
          </Paper>
        </Grid>
        <Grid item lg={6} sm={12}>
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              mb={2}
              fontWeight="bold"
              textAlign="center"
            >
              Cognitive Process Dimension
            </Typography>
            <PieChart chartLabel={cpDimensionLabel} chartData={cpdData} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
