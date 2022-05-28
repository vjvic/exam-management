import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
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
      field: "_id",
      headerName: "Result ID",

      flex: 1,
    },
    {
      field: "fullName",
      headerName: "Student",
      description: "This column has a value getter and is not sortable.",

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

            <Button
              sx={{ mr: 2 }}
              variant="contained"
              onClick={() => navigate(`/results-details/${params.row._id}`)}
            >
              2D TOS
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(`/generated/${params.row._id}`)}
            >
              Details
            </Button>
          </div>
        );
      },
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getAllResult());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div>
      <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 3 }}>
        Results
      </Typography>
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={resultList}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
};

export default Result;
