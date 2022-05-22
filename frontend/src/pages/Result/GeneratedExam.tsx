import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getResultDetails, reset } from "../../features/result/resultSlice";

const GeneratedExam = () => {
  //Router hooks
  const { id } = useParams();
  const navigate = useNavigate();

  //Redux hooks
  const dispatch = useAppDispatch();
  const { resultDet } = useAppSelector((state: RootState) => state.result);

  useEffect(() => {
    dispatch(getResultDetails(id!));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, id]);

  useEffect(() => {
    window.print();

    navigate("/results");
  }, []);

  return (
    <Box sx={{ displayPrint: "block", display: "none" }}>
      <Typography variant="h5" mb={5} fontWeight="bold">
        {resultDet?.examTitle}
      </Typography>
      {resultDet?.questions?.map((question, index) => (
        <Box key={index}>
          <Typography>
            {index + 1}. {question.questionText}
          </Typography>
          <ul>
            {question.choices.map((c) => (
              <li key={c.text}>{c.text}</li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
};

export default GeneratedExam;
