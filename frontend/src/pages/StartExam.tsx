import {
  Paper,
  Typography,
  Stack,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
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
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
/* import { getExamDetails, reset } from "../features/exam/examSlice"; */
import { Loader, Error } from "../components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { createResult } from "../features/result/resultSlice";
import { finishedExam, reset } from "../features/exam/examSlice";
/* import { Question } from "../interface/Question"; */
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

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
  const [userAnswer, setUserAnswer] = useState("");
  const [currentExam, setCurrentExam] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  /*   function shuffle(array: Question[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  } */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer((event.target as HTMLInputElement).value);
  };

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

  const handleNext = (answer: string, point: number) => {
    if (answer === userAnswer) {
      setScore((score) => score + point);
      setUserAnswer("");
    }

    if (currentExam + 1 < examLength) {
      setCurrentExam((currentExam) => currentExam + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleExit = () => {
    navigate("/home");
    dispatch(reset());
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: 2,
            gridGap: 2,
          }}
        >
          <AccessAlarmIcon />

          <Typography variant="h5">{`${minutes}:${seconds}`}</Typography>
        </Box>
      )}
      {!showScore && examDet && (
        <Paper sx={{ p: 4 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">
              {currentExam + 1}. {examQuestions.questionText}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {examQuestions.point}{" "}
              {examQuestions.point <= 1 ? "point" : "points"}
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            <Grid item lg={6}>
              <FormControl sx={{ my: 4 }}>
                <RadioGroup value={userAnswer} onChange={handleChange}>
                  {examQuestions.choices.map((choice: any) => (
                    <FormControlLabel
                      value={choice.text}
                      key={choice.text}
                      control={<Radio />}
                      label={choice.text}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item lg={6}>
              {examQuestions.image && (
                <img
                  src={`${imgPath}${examQuestions.image}`}
                  alt="question"
                  style={{ display: "block", margin: "1rem 0", width: "300px" }}
                />
              )}
            </Grid>
          </Grid>

          <Button
            variant="contained"
            endIcon={<NavigateNextIcon />}
            onClick={() =>
              handleNext(examQuestions.answer, examQuestions.point)
            }
          >
            Next
          </Button>
        </Paper>
      )}

      {showScore && (
        <Paper sx={{ p: 4 }}>
          <Typography sx={{ color: "green", textAlign: "center" }}>
            <CheckCircleIcon fontSize="large" />
          </Typography>
          <Typography
            variant="h4"
            color="green"
            textAlign="center"
            sx={{ mb: 3 }}
          >
            Congratulations
          </Typography>

          <Typography variant="h2" textAlign="center">
            Your Score: {score}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              color="error"
              sx={{ margin: "auto" }}
              endIcon={<ExitToAppIcon />}
              onClick={handleExit}
            >
              Exit
            </Button>
          </Box>
        </Paper>
      )}
    </div>
  );
};

export default StartExam;
