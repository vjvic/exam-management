import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getExamDetails, reset } from "../../features/exam/examSlice";
import { Error, Loader } from "../../components";
import {
  Paper,
  Typography,
  Stack,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import { format } from "date-fns";

const ExamDetails = () => {
  const { id } = useParams();

  //Redux hooks
  const dispatch = useAppDispatch();
  const { examDet, isLoading, isError } = useAppSelector(
    (state: RootState) => state.exam
  );

  const imgPath = "http://localhost:5000/images/";

  useEffect(() => {
    dispatch(getExamDetails(id!));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, id]);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;
  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          {examDet?.title}
        </Typography>

        <Typography mb={2}>Description: {examDet?.description}</Typography>

        <Typography mb={2}>TimeLimit {examDet?.timeLimit} mins</Typography>

        <Typography mb={2}>Code:{examDet?.code} </Typography>
        <Typography mb={2}>
          Start:
          {examDet
            ? format(
                new Date(`${examDet?.dateAndTime.from}`),
                " mm/dd/yyyy hh:mm aaa"
              )
            : ""}
        </Typography>

        <Typography mb={2}>
          End:{" "}
          {examDet
            ? format(
                new Date(`${examDet?.dateAndTime.to}`),
                " mm/dd/yyyy hh:mm aaa"
              )
            : ""}
        </Typography>

        {/*    <Typography color="text.secondary">
          {" "}
          {examDet?.questions.length}{" "}
          {examDet?.questions!.length! > 1 ? "Questions" : "Question"}
        </Typography> */}
      </Box>

      <Divider />

      {/*    <Typography variant="h5"  my={2}>
        Questions
      </Typography> */}

      {examDet?.questions.map((question, index) => (
        <Box sx={{ p: 4, my: 2 }} key={question._id}>
          {question.image && (
            <img
              src={`${imgPath}${question.image}`}
              alt="question"
              style={{ display: "block", margin: "1rem 0", width: "300px" }}
            />
          )}
          <Typography variant="h5">
            {index + 1}. {question.questionText}
          </Typography>
          <Typography variant="body1" my={1}>
            {question.point} {question.point <= 1 ? "point" : "points"}
          </Typography>

          <Typography fontWeight="bold">Choices:</Typography>
          <ul>
            {question.choices.map((option) => (
              <li key={option.text}>{option.text}</li>
            ))}
          </ul>

          <Typography>Answer: {question.answer}</Typography>

          <Typography>
            {" "}
            {question.kd} - {question.cpd}
          </Typography>
        </Box>
      ))}
    </div>
  );
};

export default ExamDetails;
