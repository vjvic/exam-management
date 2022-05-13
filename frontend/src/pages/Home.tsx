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
  const { user } = useAppSelector((state: RootState) => state.auth);
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

    if (examDet!?.users!.includes(user!?._id!)) {
      return false;
    }

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
    <Container>
      <Box component="form" sx={{ mb: 4 }} onSubmit={handleSubmit}>
        <TextField
          variant="standard"
          label="Exam Code"
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
            <Box mb={2}>
              <Typography variant="body2" color="text.secondary">
                {examDet.timeLimit} mins
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {examDet.questions.length} questions
              </Typography>
            </Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              component="div"
              sx={{ mb: 2 }}
            >
              {examDet.title}
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
              {examDet.description}
            </Typography>

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Available -{" "}
              {format(
                new Date(`${examDet.dateAndTime.from}`),
                "mm/dd/yyyy hh:mm aaa"
              )}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Closed -{" "}
              {format(
                new Date(`${examDet.dateAndTime.to}`),
                "mm/dd/yyyy hh:mm aaa"
              )}
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
              onClick={() => navigate(`/start-exam`)}
              disabled={examDateAvailable() ? false : true}
            >
              Start
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Home;
