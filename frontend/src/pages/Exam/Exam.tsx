import { useEffect } from "react";
import { Typography, Button, Box, IconButton, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getAllExam, deleteExam, reset } from "../../features/exam/examSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Loader, Error } from "../../components";

const Exam = () => {
  //React router hooks
  const navigate = useNavigate();

  //States

  //Selector and dispatch
  const { examList, isLoading, isError } = useAppSelector(
    (state: RootState) => state.exam
  );
  const dispatch = useAppDispatch();

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Exam",
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
              onClick={() => navigate(`/exam-details/${params.row._id}`)}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              onClick={() => navigate(`/exam/edit/${params.row._id}`)}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(deleteExam(params.row._id!))}>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getAllExam());

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
          Exams
        </Typography>

        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => navigate("/exam/edit")}
        >
          Add
        </Button>
      </Box>
      <Paper style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={examList}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
        />
      </Paper>
    </div>
  );
};

export default Exam;
