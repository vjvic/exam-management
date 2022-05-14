import {
  Typography,
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import {
  deleteQuestion,
  getQuestionByQuestionBank,
  reset,
} from "../../features/question/question";
import { useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Loader, Error } from "../../components";

const Questions = () => {
  //react router hooks
  const { id } = useParams();
  const navigate = useNavigate();

  //Redux hooks
  const dispatch = useAppDispatch();
  const { questionList, isLoading, isError } = useAppSelector(
    (state: RootState) => state.question
  );

  const columns: GridColDef[] = [
    {
      field: "questionText",
      headerName: "Question",
      flex: 1,
    },
    {
      field: "answer",
      headerName: "Answer",
      flex: 1,
    },
    {
      field: "point",
      headerName: "Point",
      flex: 1,
    },
    {
      field: "kd",
      headerName: "Knowledge Dimension",
      flex: 1,
    },
    {
      field: "cpd",
      headerName: "Cognitive Proccess Dimension",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      valueGetter: (params) => params.row._id,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            <IconButton
              onClick={() =>
                navigate(`/questions/edit/${id}/${params.row._id}`)
              }
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => dispatch(deleteQuestion(params.row._id!))}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getQuestionByQuestionBank(id!));

    return () => {
      dispatch(reset());
    };
  }, [id, dispatch]);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 3 }}>
          Questions
        </Typography>

        <Button
          startIcon={<AddIcon />}
          onClick={() => navigate(`/questions/edit/${id}`)}
        >
          Add Question
        </Button>
      </Box>

      {/*  <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={questionList}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
        />
      </div> */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          {questionList.map((question) => (
            <TableBody key={question._id}>
              <TableCell component="th" scope="row">
                {question.questionText}
              </TableCell>
              <TableCell component="th" align="right">
                <Button
                  onClick={() =>
                    navigate(`/questions/edit/${id}/${question._id}`)
                  }
                >
                  Edit
                </Button>
                <Button onClick={() => dispatch(deleteQuestion(question._id!))}>
                  Delete
                </Button>
              </TableCell>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </div>
  );
};

export default Questions;
