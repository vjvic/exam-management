import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { getExamDetails, reset } from "../features/exam/examSlice";
import { Error, Loader } from "../components";
import { Typography, Box, Divider, Button, Paper } from "@mui/material";
import { format } from "date-fns";

const ResultDets = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //Redux hooks
  const dispatch = useAppDispatch();
  const { examDet, isLoading, isError } = useAppSelector(
    (state: RootState) => state.exam
  );
  const { user } = useAppSelector((state: RootState) => state.auth);

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

  useEffect(() => {
    dispatch(getExamDetails(id!));
  }, [dispatch, id]);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;
  return (
    <div>
      <Paper
        sx={{
          p: 3,
          displayPrint: "none",
        }}
      >
        <div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" fontWeight="bold" mb={2}>
              {examDet?.title}
            </Typography>
            <Typography color="text.secondary">
              {" "}
              {examDet?.questions.length}{" "}
              {examDet?.questions!.length! > 1 ? "Questions" : "Question"}
            </Typography>
          </Box>

          <Typography mb={2}>Description: {examDet?.description}</Typography>

          <Typography mb={2}>Time Limit: {examDet?.timeLimit} mins</Typography>

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
        </div>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            disabled={examDateAvailable() ? false : true}
            onClick={() => navigate("/start-exam")}
          >
            Start
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default ResultDets;
