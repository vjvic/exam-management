import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { logout } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../app/store";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

/* const facultyPages = [
  {
    text: "Exams",
    path: "/",
  },
  {
    text: "Question Bank",
    path: "/questionbank",
  },
  {
    text: "Results",
    path: "/results",
  },
];
 */
const studentPages = [
  {
    text: "Home",
    path: "/home",
  },
  {
    text: "Score",
    path: "/score",
  },
];

const drawerWidth = 240;

const settings = ["Profile", "Logout"];

const Appbar = ({
  display,
  handleDrawerToggle,
}: {
  display: boolean;
  handleDrawerToggle: () => void;
}) => {
  //React router hooks
  const navigate = useNavigate();
  const location = useLocation();

  const signupPath = location.pathname === "/signup";
  const signinPath = location.pathname === "/signin";

  const { user } = useAppSelector((state: RootState) => state.auth);
  //Redux hooks

  //Statets
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  /*   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  }; */
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (path: string) => {
    navigate(path);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useAppDispatch();

  const handleSettingClick = (setting: string) => {
    if (setting === "Logout") {
      dispatch(logout());
    } else if (setting === "Profile") {
      navigate("/profile");
    }
  };

  const displayLogo = () => {
    if (signupPath || signinPath || (user && user.role === "student")) {
      return (
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: "flex" }}
        >
          OEMS
        </Typography>
      );
    }
  };

  return (
    <AppBar
      position="fixed" /* sx={{ display: display ? "block" : "none" }} */
      sx={{
        displayPrint: "none",
        width:
          signupPath || signinPath || (user && user.role === "student")
            ? "100%"
            : { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Container>
        <Toolbar disableGutters>
          {displayLogo()}

          <Box
            sx={{
              flexGrow: 1,
              display: display ? { xs: "flex", md: "none" } : "none",
            }}
          >
            {user && user!.role === "student" ? (
              ""
            ) : (
              <IconButton
                size="large"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            )}
            {/*  <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: display ? { xs: "block", md: "none" } : "none",
              }}
            >
              {user &&
                user.role === "faculty" &&
                facultyPages.map((page) => (
                  <MenuItem
                    key={page.text}
                    onClick={() => handleCloseNavMenu(page.path)}
                  >
                    <Typography textAlign="center">{page.text}</Typography>
                  </MenuItem>
                ))}
              {user &&
                user.role === "student" &&
                studentPages.map((page) => (
                  <MenuItem
                    key={page.text}
                    onClick={() => handleCloseNavMenu(page.path)}
                  >
                    <Typography textAlign="center">{page.text}</Typography>
                  </MenuItem>
                ))}
            </Menu> */}
          </Box>
          {/*   <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            EMS
          </Typography> */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
            }}
          >
            {user &&
              user.role === "student" &&
              studentPages.map((page) => (
                <Button
                  key={page.text}
                  onClick={() => handleCloseNavMenu(page.path)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.text}
                </Button>
              ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ flexGrow: 0, display: display ? "block" : "none" }}>
            {user && (
              <Tooltip title="Open settings">
                <Button
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  color="inherit"
                  endIcon={<ArrowDropDownIcon />}
                >
                  {user!.fName!}
                </Button>
              </Tooltip>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => handleSettingClick(setting)}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Appbar;
