import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { RootState } from "../app/store";
import { Loader, Error } from "../components";
import { getAllUser } from "../features/auth/authSlice";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

const User = () => {
  //Redux hooks
  const dispatch = useAppDispatch();
  const { userList, isLoading, isError } = useAppSelector(
    (state: RootState) => state.auth
  );

  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
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
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
  ];

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div>
      <Typography variant="h4" mb={3}>
        Users
      </Typography>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={userList}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
};

export default User;
