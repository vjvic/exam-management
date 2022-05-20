import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { useEffect } from "react";
import { getMyResult, reset } from "../features/result/resultSlice";
import { Loader, Error } from "../components";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Typography, Paper } from "@mui/material";

const Score = () => {
  //Redux hooks
  const dispatch = useAppDispatch();
  const { myResult, isError, isLoading } = useAppSelector(
    (state: RootState) => state.result
  );

  const columns: GridColDef[] = [
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
  ];

  useEffect(() => {
    dispatch(getMyResult());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div style={{marginTop: 50}}>
      <Typography variant="h4" mb={3}>
        My Score
      </Typography>

      <Paper style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={myResult}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
        />
      </Paper>
    </div>
  );
};

export default Score;
