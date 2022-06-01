import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Loader } from "../../components";
import { getResultDetails, reset } from "../../features/result/resultSlice";

const GeneratedExam = () => {
  //Router hooks
  const { id } = useParams();
  const navigate = useNavigate();

  //Redux hooks
  const dispatch = useAppDispatch();
  const { resultDet, isLoading } = useAppSelector(
    (state: RootState) => state.result
  );

  useEffect(() => {
    dispatch(getResultDetails(id!));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, id]);

  /*  useEffect(() => {
    if (resultDet) {
      window.print();
      navigate("/results");
    }
  }, [navigate, resultDet]); */

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ displayPrint: "block" }}>
      <Typography variant="h4" mb={5} textAlign="center">
        {resultDet?.examTitle}
      </Typography>
      <Button sx={{ displayPrint: "none" }} onClick={() => window.print()}>
        Print
      </Button>
      {resultDet?.questions?.map((question, index) => (
        <Box key={index} sx={{ my: 2 }}>
          <Typography
            sx={{
              backgroundColor:
                question.answer !== question.userAnswer
                  ? "rgba(255, 0, 0,0.1)"
                  : "rgba(51, 166, 137,0.1)",
              p: 2,
              borderRadius: "10px",
            }}
          >
            {index + 1}. {question.questionText}
          </Typography>
          <Box component="ul" sx={{ displayPrint: "block", display: "none" }}>
            {question.choices.map((c) => (
              <li key={c.text}>{c.text}</li>
            ))}
          </Box>
          <Box sx={{ displayPrint: "none", display: "block" }}>
            <Typography mt={2}>
              <Box component="span" sx={{ color: "green", fontWeight: "bold" }}>
                Correct answer:
              </Box>{" "}
              {question.answer}
            </Typography>
            {question.answer && question.answer !== question.userAnswer && (
              <Typography>
                <Box component="span" sx={{ color: "red", fontWeight: "bold" }}>
                  User answer:
                </Box>{" "}
                {question.userAnswer}
              </Typography>
            )}
          </Box>
          <Box sx={{ displayPrint: "block", display: "none" }}>
            <Typography mt={2} sx={{ displayPrint: "block", display: "none" }}>
              <Box component="span">Correct answer:</Box> {question.answer}
            </Typography>
            {question.answer && (
              <Typography>
                <Box component="span">User answer:</Box> {question.userAnswer}
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default GeneratedExam;
