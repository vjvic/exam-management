import {
  Stack,
  TextField,
  Button,
  Typography,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  Modal,
  Box,
  List,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  createExam,
  getExamDetails,
  reset,
  updateExam,
} from "../../features/exam/examSlice";
import { useNavigate, useParams } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Loader, Error } from "../../components";
import SearchIcon from "@mui/icons-material/Search";
import { getAllQuestionBank } from "../../features/questionBank/questionBankSlice";
import { QuestionBankItem } from "../../components";
import { reset as questionReset } from "../../features/question/question";
import { reset as questionBankReset } from "../../features/questionBank/questionBankSlice";
import { QuestionBank } from "../../interface/QuestionBank";
import axios from "axios";
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

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.default",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

const searchStyle = {
  display: "flex",
  alignItems: "center",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  borderRadius: 1,
  bgColor: "#fff",
  mb: 2,
  input: {
    width: "100%",
    border: "none",
    focus: "none",
    padding: "10px 16px",
    "&:focus": { outline: "none" },
  },
};

const ExamForm = () => {
  //Exam States
  const [title, setTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState("0");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [from, setFrom] = useState<Date | null>(new Date());
  const [to, setTo] = useState<Date | null>(new Date());

  //Question States
  const [questionInputFields, setQuestionInputFields] = useState([
    {
      id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
      questionText: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      point: "",
      cpd: "",
      kd: "",
      image: "",
      file: new File([""], "filename"),
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  //Selector and dispatch
  const dispatch = useAppDispatch();
  const { examDet, isSuccess, isLoading, isError } = useAppSelector(
    (state: RootState) => state.exam
  );
  const { questionBankList } = useAppSelector(
    (state: RootState) => state.questionBank
  );
  const { questionRandom } = useAppSelector(
    (state: RootState) => state.question
  );

  //React router hooks
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = id ? true : false;

  //Generate code
  const generateCode = () => {
    setCode(
      Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 9)
    );
  };

  /*  const questions = questionInputFields.map((question) => {
    const newQuestions = {
      questionText: question.questionText,
      choices: [
        { text: question.option1.toLowerCase() },
        { text: question.option2.toLowerCase() },
        { text: question.option3.toLowerCase() },
        { text: question.option4.toLowerCase() },
      ],
      answer: question.answer.toLowerCase(),
      point: Number(question.point),
      cpd: question.cpd,
      kd: question.kd,
    };

    return newQuestions;
  });
 */
  //Handlers

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const questions = questionInputFields.map((question) => {
      let filename;

      if (question.file && question.file.size > 0) {
        const data = new FormData();
        filename = Date.now() + question.file.name;
        data.append("name", filename);
        data.append("file", question.file);
        uploadHandler(data);
      }

      const newQuestions = {
        questionText: question.questionText,
        choices: [
          { text: question.option1.toLowerCase() },
          { text: question.option2.toLowerCase() },
          { text: question.option3.toLowerCase() },
          { text: question.option4.toLowerCase() },
        ],
        answer: question.answer.toLowerCase(),
        point: Number(question.point),
        cpd: question.cpd,
        kd: question.kd,
        image: filename,
      };

      return newQuestions;
    });

    if (isEdit) {
      const updatedExam = {
        _id: id,
        title,
        timeLimit: Number(timeLimit),
        description,
        code,
        dateAndTime: { from, to },
        questions: [],
      };
      dispatch(updateExam(updatedExam));
    } else {
      const newExam = {
        title,
        timeLimit: Number(timeLimit),
        description,
        code,
        dateAndTime: { from, to },
        questions: [...questions, ...questionRandom],
      };

      dispatch(createExam(newExam));
    }
  };

  const handleAddFields = () => {
    setQuestionInputFields([
      ...questionInputFields,
      {
        id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
        questionText: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
        point: "",
        cpd: "",
        kd: "",
        image: "",
        file: new File([""], "filename"),
      },
    ]);
  };

  const uploadHandler = async (data: FormData) => {
    try {
      await axios.post("api/upload", data);
    } catch (err) {}
  };

  const handleChangeInput = (id: any, event: any) => {
    const newInputFields = questionInputFields.map((i) => {
      if (id === i.id) {
        if (event.target.name === "file") {
          const file = event.target.files[0];

          i[event.target.name] = file;

          /*   console.log("file triggered");
          const data = new FormData();
          const filename = Date.now() + file.name;
          data.append("name", filename);
          data.append("file", file);

          i.images = filename;

          uploadHandler(data); */

          /* console.log(data); */
        } else {
          i[event.target.name] = event.target.value;
        }
      }
      return i;
    });

    setQuestionInputFields(newInputFields);
  };

  const handleRemoveFields = (id: number) => {
    const values = [...questionInputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setQuestionInputFields(values);
  };

  //Modal handler
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  //Filter question bank

  const filterQuestionBank = (qbList: QuestionBank[]) => {
    if (searchTerm !== "") {
      const newQuestionBank = questionBankList.filter((qb) => {
        return Object.values(qb)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });

      return newQuestionBank;
    }

    return qbList;
  };

  //Use Effect

  useEffect(() => {
    if (isEdit) {
      dispatch(getExamDetails(id!));
    }

    return () => {
      dispatch(reset());
      dispatch(questionReset());
      dispatch(questionBankReset());
    };
  }, [isEdit, id, dispatch]);

  useEffect(() => {
    if (examDet && isEdit) {
      setTitle(examDet.title);
      setTimeLimit(examDet.timeLimit.toString());
      setDescription(examDet.description);
      setCode(examDet.code);
    }
  }, [examDet, dispatch, isEdit]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    dispatch(getAllQuestionBank(""));
  }, [dispatch]);

  //Loader
  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ mb: 2 }}
          >
            Question Bank
          </Typography>

          <Box sx={searchStyle} component="form" /* onSubmit={handleSearch} */>
            <input
              type="text"
              placeholder="Search question bank"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />

            <SearchIcon sx={{ color: "text.secondary", bgColor: "#ffff" }} />
          </Box>

          {questionBankList.length > 0 && (
            <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
              Input a number that will randomly pull from the question bank
            </Typography>
          )}

          <Box sx={{ overflowY: "auto", height: "400px" }}>
            {questionBankList.length <= 0 && (
              <Box sx={{ textAlign: "center", mt: 3 }}>No Items</Box>
            )}
            <List /* dense={dense} */>
              {filterQuestionBank(questionBankList).map((qb) => (
                <QuestionBankItem title={qb.title} _id={qb._id} key={qb._id} />
              ))}
            </List>
          </Box>
        </Box>
      </Modal>

      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Create Exam
        </Typography>
        <div>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Title"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                required
              />

              <TextField
                type="number"
                label="Time Limit(mins)"
                value={timeLimit}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTimeLimit(e.target.value)
                }
                required
              />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Typography sx={{ color: "primary.main" }}>
                  Available Date and Time
                </Typography>
                <Stack spacing={2} direction="row">
                  <DateTimePicker
                    label="From"
                    value={from}
                    onChange={(newValue: Date | null) => setFrom(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                  <DateTimePicker
                    label="To"
                    value={to}
                    onChange={(newValue: Date | null) => setTo(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </Stack>
              </LocalizationProvider>

              <Stack direction="row">
                <TextField
                  label="Code"
                  value={code}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCode(e.target.value)
                  }
                  fullWidth
                  required
                />
                <Button variant="contained" onClick={generateCode}>
                  Generate
                </Button>
              </Stack>

              <TextField
                label="Description"
                multiline
                rows={3}
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription(e.target.value)
                }
                required
              />
            </Stack>

            {/*  Question Form */}

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <Typography sx={{ color: "primary.main" }}>Questions</Typography>

              <Button variant="outlined" onClick={handleOpen}>
                Question Bank
              </Button>
            </Stack>

            <div>
              {questionInputFields.map((input) => (
                <Stack
                  spacing={2}
                  key={input.id}
                  direction="row"
                  sx={{ my: 5 }}
                >
                  <Stack spacing={2} sx={{ width: "100%" }}>
                    {input.file.size > 0 && (
                      <img
                        src={URL.createObjectURL(input.file)}
                        alt="pic"
                        style={{ width: "100%" }}
                      />
                    )}
                    <div>
                      {/* <input
                        name="file"
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChangeInput(input.id, e)
                        }
                        required
                      /> */}
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
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeInput(input.id, e)
                          }
                        />
                      </Button>
                    </div>

                    <TextField
                      label="Question"
                      name="questionText"
                      value={input.questionText}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeInput(input.id, e)
                      }
                      fullWidth
                      required
                    />
                    <TextField
                      label="Option1"
                      name="option1"
                      value={input.option1}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeInput(input.id, e)
                      }
                      fullWidth
                      required
                    />
                    <TextField
                      label="Option2"
                      name="option2"
                      value={input.option2}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeInput(input.id, e)
                      }
                      fullWidth
                      required
                    />
                    <TextField
                      label="Option3"
                      name="option3"
                      value={input.option3}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeInput(input.id, e)
                      }
                      fullWidth
                      required
                    />
                    <TextField
                      label="Option4"
                      name="option4"
                      value={input.option4}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeInput(input.id, e)
                      }
                      fullWidth
                      required
                    />
                    <TextField
                      label="Answer"
                      name="answer"
                      value={input.answer}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeInput(input.id, e)
                      }
                      fullWidth
                      required
                    />
                    <TextField
                      label="Point"
                      name="point"
                      type="number"
                      value={input.point}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeInput(input.id, e)
                      }
                      fullWidth
                      required
                    />

                    <FormControl fullWidth required>
                      <InputLabel>Knowledge Dimension</InputLabel>
                      <Select
                        label="Knowledge Dimension"
                        name="kd"
                        value={input.kd}
                        defaultValue=""
                        onChange={(e: SelectChangeEvent) =>
                          handleChangeInput(input.id, e)
                        }
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
                        name="cpd"
                        value={input.cpd}
                        defaultValue=""
                        onChange={(e: SelectChangeEvent) =>
                          handleChangeInput(input.id, e)
                        }
                      >
                        {cpDimension.map((cpd) => (
                          <MenuItem value={cpd} key={cpd}>
                            {cpd}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>

                  <Stack direction="row" alignItems="center">
                    <IconButton
                      disabled={questionInputFields.length === 1}
                      onClick={() => handleRemoveFields(input.id)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton onClick={handleAddFields}>
                      <AddIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              ))}
            </div>

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
    </>
  );
};

export default ExamForm;
