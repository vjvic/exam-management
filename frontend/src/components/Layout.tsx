import { Box, CssBaseline, Toolbar, Container } from "@mui/material";
import Appbar from "./Appbar";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

const Layout = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  const signupPath = location.pathname === "/signup";
  const signinPath = location.pathname === "/signin";

  const [mobileOpen, setMobileOpen] = useState(false);

  const { user } = useAppSelector((state: RootState) => state.auth);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: signupPath || signinPath ? "block" : "flex",
      }}
    >
      <CssBaseline />

      {/*  Appbar */}
      <Appbar
        display={signupPath || signinPath ? false : true}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* Sidebar */}

      <Box
        sx={{
          display:
            signupPath || signinPath || (user && user.role === "student")
              ? "none"
              : "block",
        }}
      >
        <Sidebar
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        />
      </Box>

      {/*  Main */}

      <Container
        component="main"
        maxWidth={signupPath || signinPath ? false : "lg"}
      >
        <Toolbar
          sx={{ display: signupPath || signinPath ? "none" : "block" }}
        />
        <Toolbar
          sx={{ display: signupPath || signinPath ? "none" : "block" }}
        />
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
