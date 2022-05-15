import { useEffect } from "react";
import { Typography, Button, Box, IconButton, Paper } from "@mui/material";
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
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Question Bank
        </Typography>

        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => navigate("/questionbank/edit")}
        >
          Add
        </Button>
      </Box>

      <Paper style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={questionBankList}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
        />
      </Paper>
    </div>
  );
};

export default QuestionBank;
