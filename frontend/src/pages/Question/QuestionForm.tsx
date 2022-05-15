import {
  TextField,
  Button,
  Typography,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Stack,
  Paper,
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
/* import FileUploadIcon from "@mui/icons-material/FileUpload"; */

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
      const updatedQuestion: Question = {
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

      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        updatedQuestion.image = filename;

        try {
          await axios.post("http://localhost:5000/api/upload", data);
        } catch (error) {}
      }

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
      }
      dispatch(createQuestion(newQuestion));
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

      setChoices({
        option1: questionDet?.choices[0]?.text,
        option2: questionDet?.choices[1]?.text,
        option3: questionDet?.choices[2]?.text,
        option4: questionDet?.choices[3]?.text,
      });
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
    <>
      <Button onClick={() => navigate(`/questions/${bank}`)}>Back</Button>
      <Container maxWidth="sm">
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 3 }}>
            Create Question
          </Typography>
          <div>
            <form onSubmit={handleSubmit}>
              <Stack spacing={1}>
                <TextField
                  variant="standard"
                  label="Question "
                  value={questionText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuestionText(e.target.value)
                  }
                  fullWidth
                  required
                />

                <TextField
                  variant="standard"
                  label="Option1"
                  value={choices.option1}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChoices({ ...choices, option1: e.target.value })
                  }
                  fullWidth
                  required
                />
                <TextField
                  variant="standard"
                  label="Option2"
                  value={choices.option2}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChoices({ ...choices, option2: e.target.value })
                  }
                  fullWidth
                  required
                />
                <TextField
                  variant="standard"
                  label="Option3"
                  value={choices.option3}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChoices({ ...choices, option3: e.target.value })
                  }
                  fullWidth
                  required
                />
                <TextField
                  variant="standard"
                  label="Option4"
                  value={choices.option4}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChoices({ ...choices, option4: e.target.value })
                  }
                  fullWidth
                  required
                />

                <TextField
                  variant="standard"
                  label="Answer"
                  value={answer}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAnswer(e.target.value)
                  }
                  fullWidth
                  required
                />

                <TextField
                  variant="standard"
                  label="Points"
                  value={point}
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPoint(e.target.value)
                  }
                  fullWidth
                  required
                />

                <FormControl fullWidth required variant="standard">
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

                <FormControl fullWidth required variant="standard">
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

                {!isEdit && file && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="pic"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                )}

                {isEdit && file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="pic"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                ) : questionDet.image ? (
                  <img
                    src={`http://localhost:5000/images/${questionDet.image}`}
                    alt="pic"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                ) : (
                  ""
                )}

                <div>
                  {/*  <input type="file" onChange={onUploadChange} required /> */}

                  <Button component="label">
                    Upload Image
                    <input
                      type="file"
                      name="file"
                      hidden
                      onChange={onUploadChange}
                    />
                  </Button>
                </div>
              </Stack>

              <Button
                variant="contained"
                size="large"
                sx={{ marginTop: 4 }}
                type="submit"
                fullWidth
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

export default QuestionForm;
