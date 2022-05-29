import { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Box,
  /*   IconButton, */
  Grid,
  Card,
  CardContent,
  /*  CardActions, */
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getAllExam, deleteExam, reset } from "../../features/exam/examSlice";
/* import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridColDef } from "@mui/x-data-grid"; */
import { Loader, Error } from "../../components";
import { Exam as ExamInterface } from "../../interface/Exam";

const Exam = () => {
  //React router hooks
  const navigate = useNavigate();

  //States

  const [searchTerm, setSearchTerm] = useState("");

  //Selector and dispatch
  const { examList, isLoading, isError } = useAppSelector(
    (state: RootState) => state.exam
  );
  const dispatch = useAppDispatch();

  /*   const columns: GridColDef[] = [
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
            <IconButton onClick={() => navigate(`/edit/${params.row._id}`)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(deleteExam(params.row._id!))}>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ]; */

  //Filter exam

  const filterExam = (examList: ExamInterface[]) => {
    if (searchTerm !== "") {
      const newExam = examList.filter((qb) => {
        return Object.values(qb)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });

      return newExam;
    }

    return examList;
  };

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
        <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 3 }}>
          Exams
        </Typography>

        <Button startIcon={<AddIcon />} onClick={() => navigate("/edit")}>
          Add Exam
        </Button>
      </Box>
      {/*    <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={examList}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
        />
      </div> */}
      <Box sx={{ my: 2 }}>
        <TextField
          variant="standard"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />
      </Box>
      <Grid container spacing={3}>
        {filterExam(examList).map((exam) => (
          <Grid item lg={4} md={4} sm={6} xs={12} key={exam._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" mb={1}>
                  {exam.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {exam.description}
                </Typography>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mt: 3 }}
                >
                  <Button
                    size="small"
                    onClick={() => navigate(`/exam-details/${exam._id}`)}
                  >
                    More Details
                  </Button>
                  <div>
                    <Button onClick={() => navigate(`/edit/${exam._id}`)}>
                      Edit
                    </Button>
                    <Button onClick={() => dispatch(deleteExam(exam._id!))}>
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

export default Exam;
