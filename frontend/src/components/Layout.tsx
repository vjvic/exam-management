import { Box, CssBaseline, Toolbar, Container } from "@mui/material";
import Appbar from "./Appbar";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Layout = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  const signupPath = location.pathname === "/signup";
  const signinPath = location.pathname === "/signin";

  const [mobileOpen, setMobileOpen] = useState(false);

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

      <Sidebar
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />

      {/*  Main */}

      <Container
        component="main"
        maxWidth={signupPath || signinPath ? false : "lg"}
      >
        <Toolbar />
        <Toolbar
          sx={{ display: signupPath || signinPath ? "none" : "block" }}
        />

        {children}
      </Container>
    </Box>
  );
};

export default Layout;
