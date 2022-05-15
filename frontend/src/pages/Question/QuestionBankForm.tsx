import { TextField, Button, Typography, Container, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useParams, useNavigate } from "react-router-dom";
import {
  createQuestionBank,
  getQuestionBankDetails,
  updateQuestionBank,
  reset,
} from "../../features/questionBank/questionBankSlice";
import { Loader, Error } from "../../components";

const QuestionBankForm = () => {
  //States
  const [title, setTitle] = useState("");

  //Selector and dispatch
  const dispatch = useAppDispatch();
  const { questionBankDet, isSuccess, isLoading, isError } = useAppSelector(
    (state: RootState) => state.questionBank
  );

  //React router hooks
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = id ? true : false;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEdit) {
      dispatch(updateQuestionBank({ _id: id, title }));
    } else {
      dispatch(createQuestionBank({ title }));
    }
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getQuestionBankDetails(id!));
    }

    return () => {
      dispatch(reset());
    };
  }, [isEdit, id, dispatch]);

  useEffect(() => {
    if (questionBankDet && isEdit) {
      setTitle(questionBankDet.title);
    }
  }, [questionBankDet, dispatch, isEdit]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/questionbank");
    }
  }, [isSuccess, navigate]);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <>
      <Button onClick={() => navigate("/questionbank")}>Back</Button>
      <Container maxWidth="sm">
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 3 }}>
            Create Question Bank
          </Typography>
          <div>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="standard"
                label="Question Bank Name"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                fullWidth
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ marginTop: 4 }}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </div>
        </Paper>
      </Container>
    </>
  );
};

export default QuestionBankForm;
