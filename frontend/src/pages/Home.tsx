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

  return (
    <Container>
      <Box component="form" sx={{ mb: 4 }} onSubmit={handleSubmit}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={2}>
          Enter Exam Code{" "}
        </Typography>
        <Box sx={{ display: "flex", gridGap: 10 }}>
          <TextField
            /*   variant="standard"
          label="Exam Code" */
            variant="filled"
            fullWidth
            value={code}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCode(e.target.value)
            }
          />
          <Button variant="contained" size="large" type="submit">
            Enter
          </Button>
        </Box>
      </Box>

      {message && (
        <Box sx={{ textAlign: "center" }}>
          {typeof message === "string" && message}
        </Box>
      )}

      {examDet && (
        <Card sx={{ minWidth: 275, mt: 5 }}>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontWeight="bold" component="div">
              {examDet.title}
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate(`/resultdets/${examDet._id}`)}
            >
              Open
            </Button>
          </CardContent>
        </Card>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <img
          src="/image1.svg"
          alt="exam"
          style={{ display: "block", width: "100%", height: "50vh" }}
        />
      </Box>
    </Container>
  );
};

export default Home;
