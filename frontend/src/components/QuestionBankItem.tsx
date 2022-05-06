import {
  ListItem,
  ListItemText,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { QuestionBank } from "../interface/QuestionBank";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import question, { getRandomQuestion } from "../features/question/question";
import { RootState } from "../app/store";
import axios, { Axios } from "axios";
import { Question } from "../interface/Question";

const QuestionBankItem = ({ title, _id }: QuestionBank) => {
  const [size, setSize] = useState("");
  const [questionList, setQuestionList] = useState<Question[]>();

  //Redux hooks
  const dispatch = useAppDispatch();
  const { questionRandom } = useAppSelector(
    (state: RootState) => state.question
  );

  const { user } = useAppSelector((state: RootState) => state.auth);

  //Find question bank in question random
  const randomQuestion = questionRandom.find(
    (qrandom) => qrandom.questionBank === _id
  );

  const alreadyExist = randomQuestion ? true : false;

  //Handlers
  const handleClick = (id: string) => {
    if (size) {
      dispatch(getRandomQuestion({ size: Number(size), id }));
    }
  };

  //Get questions

  const getQuestions = async () => {
    const token = user!.token!;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/question/qbquestion/${_id}`, config);

    setQuestionList(data);
  };

  const questionSize = questionList?.length;

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <ListItem sx={{ bgcolor: "#fff", my: 1 }}>
      <ListItemText
        primary={title}
        /*   secondary={secondary ? "Secondary text" : null} */
      />

      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {questionList?.length}{" "}
        {questionList?.length! <= 1 ? "Question" : "Questions"}
      </Typography>

      <TextField
        size="small"
        type="number"
        value={size}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSize(e.target.value)
        }
        InputProps={{ inputProps: { min: 1, max: questionSize } }}
        sx={{ width: "80px", mx: 2 }}
        disabled={alreadyExist || questionSize! <= 0}
      />
      <Button
        onClick={() => handleClick(_id!)}
        disabled={alreadyExist || questionSize! <= 0}
      >
        Add
      </Button>
    </ListItem>
  );
};

export default QuestionBankItem;
