import {
  TextField,
  Button,
  Typography,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Stack,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useParams, useNavigate } from "react-router-dom";
import {
  reset,
  updateQuestion,
  createQuestion,
  getQuestionDetails,
} from "../../features/question/question";
import { Loader, Error } from "../../components";
import axios from "axios";
import { Question } from "../../interface/Question";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const cpDimension = [
  "Remember",
  "Understand",
  "Apply",
  "Analyze",
  "Evaluate",
  "Create",
];
const kDimension = ["Factual", "Conceptual", "Procedural", "Metacognitive"];

const QuestionForm = () => {
  //States
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });
  const [point, setPoint] = useState("");
  const [answer, setAnswer] = useState("");
  const [cpd, setCpd] = useState("");
  const [kd, setKd] = useState("");
  const [file, setFile] = useState<File>();

  //Selector and dispatch
  const dispatch = useAppDispatch();
  const { questionDet, isSuccess, isLoading, isError } = useAppSelector(
    (state: RootState) => state.question
  );

  //React router hooks
  const { bank, id } = useParams();
  const navigate = useNavigate();

  const isEdit = id ? true : false;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEdit) {
      const updatedQuestion = {
        _id: id,
        questionText,
        choices: [
          {
            text: choices.option1,
          },
          {
            text: choices.option2,
          },
          {
            text: choices.option3,
          },
          {
            text: choices.option4,
          },
        ],
        point: Number(point),
        answer,
        kd,
        cpd,
      };

      dispatch(updateQuestion(updatedQuestion));
    } else {
      const newQuestion: Question = {
        questionText,
        choices: [
          {
            text: choices.option1,
          },
          {
            text: choices.option2,
          },
          {
            text: choices.option3,
          },
          {
            text: choices.option4,
          },
        ],
        point: Number(point),
        answer,
        kd,
        cpd,
        questionBank: bank,
      };

      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newQuestion.image = filename;

        try {
          await axios.post("http://localhost:5000/api/upload", data);
        } catch (error) {}

        dispatch(createQuestion(newQuestion));
      }
    }
  };

  const onUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getQuestionDetails(id!));
    }

    return () => {
      dispatch(reset());
    };
  }, [isEdit, id, dispatch]);

  useEffect(() => {
    if (questionDet && isEdit) {
      setQuestionText(questionDet.questionText);
      setPoint(questionDet.point.toString());
      setAnswer(questionDet.answer);
      setKd(questionDet.kd);
      setCpd(questionDet.cpd);
    }
  }, [questionDet, dispatch, isEdit]);

  useEffect(() => {
    if (isSuccess) {
      navigate(`/questions/${bank}`);
    }
  }, [isSuccess, navigate, bank]);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Create Question
      </Typography>
      <div>
        <form onSubmit={handleSubmit}>
          <Stack spacing={1}>
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="pic"
                style={{ width: "100%" }}
              />
            )}
            <div>
              {/*  <input type="file" onChange={onUploadChange} required /> */}

              <Button
                variant="outlined"
                component="label"
                startIcon={<FileUploadIcon />}
              >
                Upload Image
                <input
                  type="file"
                  name="file"
                  hidden
                  onChange={onUploadChange}
                />
              </Button>
            </div>
            <TextField
              label="Question Text"
              value={questionText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuestionText(e.target.value)
              }
              fullWidth
              required
            />

            <TextField
              label="Option1"
              value={choices.option1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setChoices({ ...choices, option1: e.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Option2"
              value={choices.option2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setChoices({ ...choices, option2: e.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Option3"
              value={choices.option3}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setChoices({ ...choices, option3: e.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Option4"
              value={choices.option4}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setChoices({ ...choices, option4: e.target.value })
              }
              fullWidth
              required
            />

            <TextField
              label="Answer"
              value={answer}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAnswer(e.target.value)
              }
              fullWidth
              required
            />

            <TextField
              label="Points"
              value={point}
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPoint(e.target.value)
              }
              fullWidth
              required
            />

            <FormControl fullWidth required>
              <InputLabel>Knowledge Dimension</InputLabel>
              <Select
                label="Knowledge Dimension"
                value={kd}
                onChange={(e: SelectChangeEvent) => setKd(e.target.value)}
              >
                {kDimension.map((kd) => (
                  <MenuItem value={kd} key={kd}>
                    {kd}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Cognitive Proccess Dimension</InputLabel>
              <Select
                label="Cognitive Proccess Dimension"
                value={cpd}
                onChange={(e: SelectChangeEvent) => setCpd(e.target.value)}
              >
                {cpDimension.map((cpd) => (
                  <MenuItem value={cpd} key={cpd}>
                    {cpd}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Button
            variant="contained"
            size="large"
            sx={{ marginTop: 4 }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default QuestionForm;
