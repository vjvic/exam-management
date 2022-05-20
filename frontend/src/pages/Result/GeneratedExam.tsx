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
      {resultDet?.questions?.map((question, index) => (
        <Box>
          <Typography>
            {index + 1}. {question.questionText}
          </Typography>
          <ul>
            {question.choices.map((c) => (
              <li>{c.text}</li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
};

export default GeneratedExam;
