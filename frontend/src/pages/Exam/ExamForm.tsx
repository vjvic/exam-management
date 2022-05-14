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
  Paper,
  Divider,
  Alert,
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
  width: 900,
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
  const [questionInputFields, setQuestionInputFields] = useState<
    | {
        id: any;
        questionText: string;
        option1: string;
        option2: string;
        option3: string;
        option4: string;
        answer: string;
        point: string;
        cpd: string;
        kd: string;
        image?: string;
        file?: File;
      }[]
    | null
  >([]);

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

    const questions = questionInputFields!.map((question) => {
      let filename;

      if (isEdit && question.image) {
        filename = question.image;
      }

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
        questions: [...questions, ...questionRandom],
      };

      console.log(updatedExam);
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
      ...questionInputFields!,
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
      await axios.post("/api/upload", data);
    } catch (err) {}
  };

  const handleChangeInput = (id: any, event: any) => {
    const newInputFields = questionInputFields!.map((i) => {
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
    const values = [...questionInputFields!];
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
      setFrom(examDet.dateAndTime.from);
      setTo(examDet.dateAndTime.to);

      /*    examDet!.questions!.map((question) => {
        setQuestionInputFields([
          ...questionInputFields!,
          {
            id: question._id!,
            questionText: question.questionText!,
            option1: question.choices[0].text!,
            option2: question.choices[1].text!,
            option3: question.choices[2].text!,
            option4: question.choices[3].text!,
            answer: question.answer!,
            point: question.point!.toString(),
            cpd: question.cpd!,
            kd: question.kd!,
            image: question.image!,
            file: new File([""], "filename"),
          },
        ]);
      }); */

      setQuestionInputFields(
        examDet!.questions!.map((question) => ({
          id: question._id!,
          questionText: question.questionText!,
          option1: question.choices[0].text!,
          option2: question.choices[1].text!,
          option3: question.choices[2].text!,
          option4: question.choices[3].text!,
          answer: question.answer!,
          point: question.point!.toString(),
          cpd: question.cpd!,
          kd: question.kd!,
          image: question.image!,
          file: new File([""], "filename"),
        }))
      );
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
            fontWeight="bold"
            component="h2"
            sx={{ mb: 2 }}
          >
            Question Bank
          </Typography>

          <Box component="form" /* onSubmit={handleSearch} */>
            <TextField
              variant="standard"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
          </Box>

          {/*  {questionBankList.length > 0 && (
            <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
              Input a number that will randomly pull from the question bank
            </Typography>
          )} */}

          <Box sx={{ overflowY: "auto", height: "400px" }}>
            {questionBankList.length <= 0 && (
              <Box sx={{ textAlign: "center" }}>No Question Bank</Box>
            )}
            <List /* dense={dense} */>
              {filterQuestionBank(questionBankList).map((qb, index) => (
                <div key={qb._id}>
                  <QuestionBankItem title={qb.title} _id={qb._id} />
                </div>
              ))}
            </List>
          </Box>
        </Box>
      </Modal>

      <Container maxWidth="sm">
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 3 }}>
            Create Exam
          </Typography>

          <div>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  variant="standard"
                  label="Title"
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                  required
                />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={2}>
                    <DateTimePicker
                      label="Start Date"
                      value={from}
                      onChange={(newValue: Date | null) => setFrom(newValue)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth variant="standard" />
                      )}
                    />
                    <DateTimePicker
                      label="End Date"
                      value={to}
                      onChange={(newValue: Date | null) => setTo(newValue)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth variant="standard" />
                      )}
                    />
                  </Stack>
                </LocalizationProvider>

                <TextField
                  variant="standard"
                  type="number"
                  label="Time Limit(minutes)"
                  value={timeLimit}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTimeLimit(e.target.value)
                  }
                  required
                />

                <Stack direction="row">
                  <TextField
                    variant="standard"
                    label="Code"
                    value={code}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCode(e.target.value)
                    }
                    fullWidth
                    required
                  />
                  {/*   <Button variant="contained" onClick={generateCode}>
                  Generate
                </Button> */}
                </Stack>

                <TextField
                  variant="standard"
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
                <div>
                  <Button onClick={handleOpen}>Question Bank</Button>
                  <Button sx={{ mr: 2 }} onClick={handleAddFields}>
                    Add Question
                  </Button>
                </div>
              </Stack>

              <div>
                {questionInputFields &&
                  questionInputFields!.map((input) => (
                    <Stack
                      spacing={2}
                      key={input.id}
                      /* direction="row" */
                      sx={{ my: 3 }}
                    >
                      <Stack spacing={2} sx={{ width: "100%" }}>
                        <TextField
                          variant="standard"
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
                          variant="standard"
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
                          variant="standard"
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
                          variant="standard"
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
                          variant="standard"
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
                          variant="standard"
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
                          variant="standard"
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

                        <FormControl fullWidth variant="standard" required>
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

                        <FormControl fullWidth variant="standard" required>
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

                      {!isEdit && input!?.file!.size > 0 && (
                        <img
                          src={URL.createObjectURL(input!?.file!)}
                          alt="pic"
                          style={{ width: "100%", borderRadius: "10px" }}
                        />
                      )}

                      {isEdit && input!?.file!.size > 0 ? (
                        <img
                          src={URL.createObjectURL(input!?.file!)}
                          alt="pic"
                          style={{ width: "100%", borderRadius: "10px" }}
                        />
                      ) : input.image ? (
                        <img
                          src={`http://localhost:5000/images/${input.image}`}
                          alt="pic"
                          style={{ width: "100%", borderRadius: "10px" }}
                        />
                      ) : (
                        ""
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
                        <Button component="label">
                          Upload Image
                          <input
                            type="file"
                            name="file"
                            hidden
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChangeInput(input.id, e)}
                          />
                        </Button>
                      </div>

                      <Stack direction="row" alignItems="center">
                        <Button
                          /*  disabled={questionInputFields!.length === 1} */
                          onClick={() => handleRemoveFields(input!?.id!)}
                        >
                          Remove
                        </Button>
                        <Button onClick={handleAddFields}>Add</Button>
                      </Stack>
                    </Stack>
                  ))}
              </div>

              <Button
                variant="contained"
                size="large"
                sx={{ marginY: 1 }}
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

export default ExamForm;
