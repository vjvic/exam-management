import { useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  IconButton,
  Grid,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteQuestionBank,
  getAllQuestionBank,
  reset,
} from "../../features/questionBank/questionBankSlice";
import { RootState } from "../../app/store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Loader, Error } from "../../components";

const QuestionBank = () => {
  const navigate = useNavigate();

  //Selector and dispatch
  const { questionBankList, isLoading, isError } = useAppSelector(
    (state: RootState) => state.questionBank
  );
  const dispatch = useAppDispatch();

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Question Bank",
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
              onClick={() => navigate(`/questions/${params.row._id}`)}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              onClick={() => navigate(`/questionbank/edit/${params.row._id}`)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => dispatch(deleteQuestionBank(params.row._id!))}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getAllQuestionBank(""));

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 3 }}>
          Question Bank
        </Typography>

        <Button
          startIcon={<AddIcon />}
          onClick={() => navigate("/questionbank/edit")}
        >
          Add Question Bank
        </Button>
      </Box>

      {/*  <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={questionBankList}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
        />
      </div> */}
      <Grid container spacing={3}>
        {questionBankList.map((questionBank) => (
          <Grid item lg={4} md={4} sm={6} xs={12} key={questionBank._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" mb={1}>
                  {questionBank.title}
                </Typography>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mt: 3 }}
                >
                  <Button
                    size="small"
                    onClick={() => navigate(`/questions/${questionBank._id}`)}
                  >
                    View Question
                  </Button>
                  <div>
                    <Button
                      onClick={() =>
                        navigate(`/questionbank/edit/${questionBank._id}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() =>
                        dispatch(deleteQuestionBank(questionBank._id!))
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default QuestionBank;
