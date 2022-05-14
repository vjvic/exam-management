import {
  ListItem,
  ListItemText,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { QuestionBank } from "../interface/QuestionBank";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import question, { getRandomQuestion } from "../features/question/question";
import { RootState } from "../app/store";
import axios, { Axios } from "axios";
import { Question } from "../interface/Question";
import { SelectChangeEvent } from "@mui/material/Select";

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

  const questionSize = questionList!?.length!;
  const questionSize2 = questionList!?.length!;

  console.log(Array.from(Array(questionSize2).keys()));
  console.log(questionSize + 1);

  useEffect(() => {
    getQuestions();
  }, []);

  if (!questionList) return <div></div>;

  return (
    <ListItem>
      <ListItemText
        primary={title}
        /*   secondary={secondary ? "Secondary text" : null} */
      />

      {/*   <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {questionList?.length}{" "}
        {questionList?.length! <= 1 ? "Question" : "Questions"}
      </Typography> */}

      {/* <TextField
        size="small"
        type="number"
        value={size}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSize(e.target.value)
        }
        InputProps={{ inputProps: { min: 1, max: questionSize } }}
        sx={{ width: "80px", mx: 2 }}
        disabled={alreadyExist || questionSize! <= 0}
      /> */}

      <FormControl
        size="small"
        variant="standard"
        sx={{ mx: 2, width: "100px" }}
      >
        <InputLabel id="demo-simple-select-label">Question</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Question"
          value={size}
          onChange={(e: SelectChangeEvent) => setSize(e.target.value)}
        >
          {[...Array(questionSize + 1).keys()].map((x) => (
            <MenuItem key={x} value={x}>
              {x}
            </MenuItem>
          ))}
          {/*  <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={() => handleClick(_id!)}
        disabled={alreadyExist || questionSize! <= 0}
      >
        Add
      </Button>
    </ListItem>
  );
};

export default QuestionBankItem;
