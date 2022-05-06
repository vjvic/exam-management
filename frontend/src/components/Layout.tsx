import { Box, CssBaseline, Toolbar, Container } from "@mui/material";
import Appbar from "./Appbar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  const signupPath = location.pathname === "/signup";
  const signinPath = location.pathname === "/signin";

  return (
    <Box>
      <CssBaseline />

      {/*  Appbar */}
      <Appbar display={signupPath || signinPath ? false : true} />

      {/*  Main */}

      <Container
        component="main"
        maxWidth={signupPath || signinPath ? false : "lg"}
      >
        <Toolbar
          sx={{ display: signupPath || signinPath ? "none" : "block" }}
        />
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
