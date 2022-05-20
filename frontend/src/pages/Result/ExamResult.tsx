import { IconButton, Typography, capitalize } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getResultDetails, reset } from "../../features/result/resultSlice";
import PrintIcon from "@mui/icons-material/Print";

const ExamResult = () => {
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

  return (
    <Box sx={{ displayPrint: "block" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <Typography variant="h5" fontWeight="bold" my={1}>
          {resultDet?.examTitle}
        </Typography>
        <IconButton
          sx={{ displayPrint: "none" }}
          onClick={() => window.print()}
        >
          <PrintIcon />
        </IconButton>
      </Box>
      {resultDet?.questions?.map((question, index) => (
        <Box>
          <Typography variant="h6">
            {index + 1}. {question.questionText}
          </Typography>
          <ul>
            {question.choices.map((c) => (
              <li style={{ listStyle: "none" }}>{c.text}</li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
};

export default ExamResult;
