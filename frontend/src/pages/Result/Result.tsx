import { useEffect } from "react";
import {
  Typography,
  /*   Button,
  Menu,
  MenuItem,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper, */
  IconButton,
  Paper,
  Button,
} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
/* import MoreHorizIcon from "@mui/icons-material/MoreHoriz"; */
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getAllResult } from "../../features/result/resultSlice";
import { Error, Loader } from "../../components";
import { useNavigate } from "react-router-dom";

const Result = () => {
  /*   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); */
  /*   const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }; */

  const navigate = useNavigate();

  //React hooks
  const { resultList, isLoading, isError } = useAppSelector(
    (state: RootState) => state.result
  );
  const dispatch = useAppDispatch();

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.fName || ""} ${params.row.lName || ""}`,
    },
    {
      field: "examTitle",
      headerName: "Exam Title",
      flex: 1,
    },
    {
      field: "score",
      headerName: "Score",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {/*  <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              elevation={0}
            >
              <MenuItem onClick={handleClose}>Delete</MenuItem>
              <MenuItem onClick={handleClose}>Edit</MenuItem>
              <MenuItem onClick={handleClose}>Details</MenuItem>
            </Menu> */}

            <Button onClick={() => navigate(`/exam-result/${params.row._id}`)}>
              Exam
            </Button>
            <Button
              onClick={() => navigate(`/results-details/${params.row._id}`)}
            >
              2D Tos
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getAllResult());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 ,mt: 5 , }}>
        Results
      </Typography>

      <Paper style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={resultList}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
        />
      </Paper>
    </div>
  );
};

export default Result;
