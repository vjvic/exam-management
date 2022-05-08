import {
  Card,
  Container,
  TextField,
  Typography,
  CardContent,
  CardActions,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useState } from "react";
import { getExamByCode } from "../features/exam/examSlice";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Home = () => {
  //States
  const [code, setCode] = useState("");

  //Router hooks
  const navigate = useNavigate();

  //Redux Hooks
  const { examDet, message } = useAppSelector((state: RootState) => state.exam);
  const dispatch = useAppDispatch();

  //Handlers
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (code) {
      dispatch(getExamByCode(code));
    }
  };

  //Enable if available
  const examDateAvailable = () => {
    const startDate = examDet
      ? format(new Date(`${examDet!.dateAndTime!.from!}`), "yyyy MM dd k mm s")
      : null;

    const endDate = examDet
      ? format(new Date(`${examDet!.dateAndTime!.to!}`), "yyyy MM dd k mm s")
      : null;

    const dateNow = format(new Date(), "yyyy MM dd k mm s");

    if (dateNow >= endDate!) {
      return false;
    }

    if (dateNow < startDate!) {
      return false;
    } else if (dateNow >= startDate!) {
      return true;
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" sx={{ mb: 4 }} onSubmit={handleSubmit}>
        <Typography textAlign="center" variant="h5" sx={{ mb: 4 }}>
          {" "}
          Enter exam code here
        </Typography>
        <TextField
          fullWidth
          value={code}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCode(e.target.value)
          }
        />
      </Box>

      {message && (
        <Box sx={{ textAlign: "center" }}>
          {typeof message === "string" && message}
        </Box>
      )}

      {examDet && (
        <Card sx={{ minWidth: 275, mt: 5 }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              {examDet.title}
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
              {examDet.description}
            </Typography>

            <Box mb={2}>
              <Typography variant="body2" color="text.secondary">
                {examDet.questions.length} questions
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {examDet.timeLimit} mins
              </Typography>
            </Box>

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Start at{" "}
              {format(
                new Date(`${examDet.dateAndTime.from}`),
                "EEEE MMMM dd yyyy hh:mm aaa"
              )}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              End at{" "}
              {format(
                new Date(`${examDet.dateAndTime.to}`),
                "EEEE MMMM dd yyyy hh:mm aaa"
              )}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => navigate(`/start-exam`)}
              disabled={examDateAvailable() ? false : true}
            >
              Start Exam
            </Button>
          </CardActions>
        </Card>
      )}

      <Paper sx={{ mt: 4, py: 2, px: 4 }}>
        <Typography variant="h5" textAlign="center">
          General Instructions
        </Typography>

        <Box component="ul" sx={{ li: { margin: "1rem 0" } }}>
          <li>
            You can answer the exam once by entering the exam code with the
            available date of the exam.
          </li>

          <li>By clicking "start exam " the exam will start</li>

          <li>The exam will be automatically submitted if time runs out</li>

          <li>Score will be given after the exam is submitted</li>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
