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
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const pages = [
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
const settings = ["Profile", "Logout"];

const Appbar = ({ display }: { display: boolean }) => {
  //React router hooks
  const navigate = useNavigate();

  const { user } = useAppSelector((state: RootState) => state.auth);
  //Redux hooks

  //Statets
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
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

  return (
    <AppBar
      position="static" /* sx={{ display: display ? "block" : "none" }} */
    >
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            EMS
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: display ? { xs: "flex", md: "none" } : "none",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
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
              {pages.map((page) => (
                <MenuItem
                  key={page.text}
                  onClick={() => handleCloseNavMenu(page.path)}
                >
                  <Typography textAlign="center">{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            EMS
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: display ? { xs: "none", md: "flex" } : "none",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.text}
                onClick={() => handleCloseNavMenu(page.path)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.text}
              </Button>
            ))}
          </Box>

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
