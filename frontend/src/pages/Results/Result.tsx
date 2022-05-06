import { useState } from "react";
import {
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper,
} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const rows = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    score: 10,
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    score: 10,
  },
  {
    id: 3,
    firstName: "John",
    lastName: "Doe",
    score: 10,
  },
  {
    id: 4,
    firstName: "John",
    lastName: "Doe",
    score: 10,
  },
  {
    id: 5,
    firstName: "John",
    lastName: "Doe",
    score: 10,
  },
  {
    id: 6,
    firstName: "John",
    lastName: "Doe",
    score: 10,
  },
  {
    id: 7,
    firstName: "John",
    lastName: "Doe",
    score: 10,
  },
];

const Result = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
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
            <Button
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
            </Menu>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Results
      </Typography>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};

export default Result;
