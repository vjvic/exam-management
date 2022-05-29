import { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Box,
  IconButton,
  Grid,
  Card,
  CardContent,
  Stack,
  TextField,
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
import { QuestionBank as QBInterface } from "../../interface/QuestionBank";

const QuestionBank = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  //Selector and dispatch
  const { questionBankList, isLoading, isError } = useAppSelector(
    (state: RootState) => state.questionBank
  );
  const dispatch = useAppDispatch();

  //Filter question bank

  const filterQuestionbank = (questionBankList: QBInterface[]) => {
    if (searchTerm !== "") {
      const newQuestionBank = questionBankList.filter((qb) => {
        return Object.values(qb)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });

      return newQuestionBank;
    }

    return questionBankList;
  };

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
        {filterQuestionbank(questionBankList).map((questionBank) => (
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
