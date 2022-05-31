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
  Divider,
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
import { Question } from "../interface/Question";

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

  const [examResult, setExamResult] = useState<Question[]>([]);

  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);

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

  /*  let examResult: Question[] = []; */

  const handleNext = (answer: string, point: number) => {
    /*   setUserAnswer(text);
    console.log(userAnswer); */

    const newQuestion = { userAnswer, ...examQuestions };

    setExamResult([...examResult, newQuestion]);
    console.log(examResult);

    if (answer !== userAnswer) {
      setWrongAnswer((wrongAnswer) => wrongAnswer + 1);
    }

    if (answer === userAnswer) {
      setCorrectAnswer((correctAnswer) => correctAnswer + 1);
      setScore((score) => score + point);
      /*    setUserAnswer(""); */
    }

    if (currentExam + 1 < examLength) {
      setCurrentExam((currentExam) => currentExam + 1);
    } else {
      setShowScore(true);
    }

    setUserAnswer("");
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
        questions: examResult,
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
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" fontWeight="bold" mb={2}>
            Time Limit: {`${minutes}:${seconds}`}
          </Typography>
          <Typography variant="body1" fontWeight="bold" mb={2}>
            Question {currentExam + 1}/{examDet!.questions.length}
          </Typography>
        </Box>
      )}
      {!showScore && examDet && (
        <Paper sx={{ p: 4, py: 6 }}>
          <Box
            sx={{
              borderRadius: "10px",
              backgroundColor: "rgba(51, 166, 137,0.1)",
              p: 3,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>
                {currentExam + 1}. {examQuestions.questionText}
              </Typography>
              <Typography variant="body1" color="green">
                ({examQuestions.point}
                {examQuestions.point <= 1 ? "point" : "points"})
              </Typography>
            </Stack>
          </Box>

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

          <div>
            <FormControl sx={{ my: 4, px: 2 }} fullWidth>
              <RadioGroup value={userAnswer} onChange={handleChange}>
                {examQuestions.choices.map((choice: any) => (
                  <FormControlLabel
                    sx={{
                      py: 1,
                      borderRadius: "10px",
                      backgroundColor:
                        userAnswer === choice.text
                          ? "rgba(51, 166, 137,0.1)"
                          : "#ddd",
                      width: "50%",
                      my: 1,
                      /*    border:
                        userAnswer === choice.text ? "1px solid green" : "", */
                    }}
                    value={choice.text}
                    key={choice.text}
                    control={<Radio />}
                    label={choice.text}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={() =>
                handleNext(examQuestions.answer, examQuestions.point)
              }
            >
              Next
            </Button>
          </Box>
        </Paper>
      )}

      <Paper sx={{ p: 2, mt: 4 }}></Paper>

      {showScore && (
        <>
          <Paper sx={{ p: 4 }}>
            <Typography
              mb={2}
              variant="h5"
              fontWeight="bold"
              textAlign="center"
            >
              Results
            </Typography>

            <Typography variant="h6">
              Correct answer: {correctAnswer}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h6">Wrong answer: {wrongAnswer}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h6">Final Score: {score}</Typography>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ mt: 3 }}>
              <Button sx={{ margin: "auto" }} onClick={handleExit}>
                Back to home
              </Button>
            </Box>
          </Paper>

          <Paper sx={{ p: 4, mt: 5 }}>
            <Typography textAlign="center" variant="h5" fontWeight="bold">
              Detailed Analysis
            </Typography>

            {examResult!.map((question, index) => (
              <div key={index}>
                <Typography
                  sx={{
                    backgroundColor:
                      question.answer !== question.userAnswer
                        ? "rgba(255, 0, 0,0.1)"
                        : "rgba(51, 166, 137,0.1)",
                    my: 2,
                    p: 2,
                    borderRadius: "10px",
                  }}
                >
                  {index + 1}. {question.questionText}
                </Typography>
                <Typography>
                  <Box
                    component="span"
                    sx={{ color: "green", fontWeight: "bold" }}
                  >
                    Correct answer:
                  </Box>{" "}
                  {question.answer}
                </Typography>
                {question.answer !== question.userAnswer && (
                  <Typography>
                    <Box
                      component="span"
                      sx={{ color: "red", fontWeight: "bold" }}
                    >
                      Your answer:
                    </Box>{" "}
                    {question.userAnswer}
                  </Typography>
                )}
              </div>
            ))}
          </Paper>
        </>
      )}
    </div>
  );
};

export default StartExam;
