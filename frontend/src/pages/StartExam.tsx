import {
  Paper,
  Typography,
  Stack,
  /*   FormControl,
  RadioGroup,
  Radio,
  FormControlLabel, */
  Button,
  Box,
  Grid,
} from "@mui/material";
import {
  useAppDispatch,
  useAppSelector /* , useAppDispatch */,
} from "../app/hooks";
import { RootState } from "../app/store";
import { /* useParams, */ useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
/* import NavigateNextIcon from "@mui/icons-material/NavigateNext"; */
/* import { getExamDetails, reset } from "../features/exam/examSlice"; */
import { Loader, Error } from "../components";
/* import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; */
import { createResult } from "../features/result/resultSlice";
import { finishedExam, reset } from "../features/exam/examSlice";
/* import { Question } from "../interface/Question"; */

const StartExam = () => {
  //Router hooks

  /*   const { id } = useParams(); */
  const navigate = useNavigate();

  //Redux hooks
  const dispatch = useAppDispatch();
  const { examDet, isLoading, isError } = useAppSelector(
    (state: RootState) => state.exam
  );
  const { user } = useAppSelector((state: RootState) => state.auth);
  /*   const dispatch = useAppDispatch(); */

  //States
  /*   const [userAnswer, setUserAnswer] = useState(""); */
  const [currentExam, setCurrentExam] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);

  /*   function shuffle(array: Question[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  } */
  /*   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer((event.target as HTMLInputElement).value);
  }; */

  let shuffled = useMemo(
    () =>
      examDet!
        .questions!.map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value),
    []
  );

  /* const shuffleQuestion = useMemo(() => shuffle([...examDet!?.questions!]), []); */
  /*   console.log(shuffled); */

  /*   console.log("shuff", shuffleQuestion[currentExam]); */

  const examQuestions = shuffled[currentExam]!;
  const imgPath = "http://localhost:5000/images/";

  const examLength = examDet?.questions!.length!;

  const handleNext = (answer: string, point: number, text: string) => {
    /*   setUserAnswer(text);
    console.log(userAnswer); */

    if (answer !== text) {
      setWrongAnswer((wrongAnswer) => wrongAnswer + 1);
    }

    if (answer === text) {
      setCorrectAnswer((correctAnswer) => correctAnswer + 1);
      setScore((score) => score + point);
      /*    setUserAnswer(""); */
    }

    if (currentExam + 1 < examLength) {
      setCurrentExam((currentExam) => currentExam + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleExit = () => {
    dispatch(reset());
    navigate("/home");
  };

  //Timer

  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(5);

  const updateTime = () => {
    if (seconds === 0) {
      setMinutes((minutes) => minutes - 1);
      setSeconds(59);
    } else {
      setSeconds((seconds) => seconds - 1);
    }
  };

  /*eslint-disable */
  useEffect(() => {
    const token = setTimeout(updateTime, 1000);

    if (seconds === 0 && minutes === 0) clearTimeout(token);

    if (minutes === 0 && seconds === 0) {
      setShowScore(true);
    }

    return function cleanUp() {
      clearTimeout(token);
    };
  });

  useEffect(() => {
    setMinutes(Number(examDet?.timeLimit! - 1));
  }, []);

  /*   useEffect(() => {
    dispatch(getExamDetails(id!));
    return () => {
      dispatch(reset());
    };
  }, [id, dispatch]); */

  useEffect(() => {
    if (!examDet) {
      navigate("/home");
      dispatch(reset());
    }
  }, []);

  useEffect(() => {
    if (showScore) {
      setMinutes(0);
      setSeconds(0);

      const userResult = {
        fName: user!?.fName!.toString(),
        lName: user!?.lName!.toString(),
        examTitle: examDet!?.title!.toString(),
        score: Number(score),
        questions: shuffled,
      };

      dispatch(createResult(userResult!));
      dispatch(finishedExam(examDet!._id!));
    }
  }, [showScore]);

  /*   useEffect(() => {
    if (showScore) {
      navigate("/final-score");
    }
  }, [showScore, navigate]); */

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div>
      {!showScore && (
        <Box>
          <Typography variant="body1" fontWeight="bold" mb={2}>
            Time Limit: {`${minutes}:${seconds}`}
          </Typography>
        </Box>
      )}
      {!showScore && examDet && (
        <Paper sx={{ p: 4 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="bold">
              {currentExam + 1}. {examQuestions.questionText}
            </Typography>
            <Typography variant="body1" color="green">
              {examQuestions.point}{" "}
              {examQuestions.point <= 1 ? "point" : "points"}
            </Typography>
          </Stack>

          {examQuestions.image && (
            <img
              src={`${imgPath}${examQuestions.image}`}
              alt="question"
              style={{
                display: "block",
                margin: "1rem 0",
                width: "300px",
                borderRadius: "10px",
              }}
            />
          )}

          <Box sx={{ my: 3 }}>
            <Grid container spacing={2}>
              {examQuestions.choices.map((choice: any) => (
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Button
                    size="large"
                    variant="outlined"
                    fullWidth
                    onClick={() =>
                      handleNext(
                        examQuestions.answer,
                        examQuestions.point,
                        choice.text
                      )
                    }
                  >
                    {choice.text}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/*   <Button
            onClick={() =>
              handleNext(examQuestions.answer, examQuestions.point)
            }
          >
            Next
          </Button> */}
        </Paper>
      )}

      {showScore && (
        <Paper sx={{ p: 4 }}>
          <Typography mb={2} variant="h5" fontWeight="bold">
            Results
          </Typography>

          <Typography variant="h6">Correct answer: {correctAnswer}</Typography>
          <Typography variant="h6">Wrong answer: {wrongAnswer}</Typography>
          <Typography variant="h6">Final Score: {score}</Typography>

          <Box sx={{ mt: 3 }}>
            <Button sx={{ margin: "auto" }} onClick={handleExit}>
              Back to home
            </Button>
          </Box>
        </Paper>
      )}
    </div>
  );
};

export default StartExam;
