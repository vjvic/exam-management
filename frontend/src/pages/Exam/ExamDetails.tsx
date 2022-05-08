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
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" mb={2}>
          {examDet?.title}
        </Typography>

        <Typography mb={2}>Description: {examDet?.description}</Typography>

        <Typography mb={2}>Time Limit : {examDet?.timeLimit} mins</Typography>

        <Typography mb={2}>
          Start date:{" "}
          {examDet
            ? format(
                new Date(`${examDet?.dateAndTime.from}`),
                "EEEE MMMM dd yyyy hh:mm aaa"
              )
            : ""}
        </Typography>

        <Typography mb={2}>
          End date:{" "}
          {examDet
            ? format(
                new Date(`${examDet?.dateAndTime.from}`),
                "EEEE MMMM dd yyyy hh:mm aaa"
              )
            : ""}
        </Typography>

        <Typography mb={2}>Code: {examDet?.code} </Typography>

        <Typography color="text.secondary">
          {" "}
          {examDet?.questions.length}{" "}
          {examDet?.questions!.length! > 1 ? "Questions" : "Question"}
        </Typography>
      </Paper>

      <Typography variant="h5" my={2}>
        Questions
      </Typography>

      {examDet?.questions.map((question) => (
        <Paper sx={{ p: 4, my: 2 }} key={question._id}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">{question.questionText}</Typography>
            <Typography variant="body1" color="text.secondary">
              {question.point} {question.point <= 1 ? "point" : "points"}
            </Typography>
          </Stack>

          {question.image && (
            <img
              src={`${imgPath}${question.image}`}
              alt="question"
              style={{ display: "block", margin: "1rem 0", width: "300px" }}
            />
          )}

          <div>
            <FormControl sx={{ my: 4 }}>
              <RadioGroup defaultValue={question.answer}>
                {question.choices.map((choice) => (
                  <FormControlLabel
                    value={choice.text}
                    key={choice.text}
                    control={<Radio />}
                    label={choice.text}
                    disabled
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>

          <Typography>Knowledge Dimension: {question.kd}</Typography>
          <Typography>Cognitive Process Dimension: {question.cpd}</Typography>
        </Paper>
      ))}
    </div>
  );
};

export default ExamDetails;
