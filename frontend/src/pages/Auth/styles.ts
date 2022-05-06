import { Paper, Container } from "@mui/material";
import { styled } from "@mui/system";

export const FormContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "90vh",
}));

export const Wrapper = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: "500px",
  border: "1px solid white",
  padding: 30,
}));
