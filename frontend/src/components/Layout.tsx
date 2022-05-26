import {
  Box,
  CssBaseline,
  Toolbar,
  Container,
  Button,
  Modal,
  Typography,
  Divider,
  TextField,
} from "@mui/material";
import Appbar from "./Appbar";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "0",
  right: "0",
  height: "100%",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Layout = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  const signupPath = location.pathname === "/signup";
  const signinPath = location.pathname === "/signin";

  const [mobileOpen, setMobileOpen] = useState(false);

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [text, setText] = useState("");
  const [color, setColor] = useState("");
  const [file, setFile] = useState<File>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(text, color);
  };

  const onUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);
  };

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

      {/*Modal*/}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Settings
          </Typography>
          <Divider />
          <form onSubmit={handleSubmit}>
            <div>
              <Typography variant="h6" component="h2" mt={5}>
                Logo
              </Typography>
              <Box sx={{ width: "100px", m: "auto" }}>
                <img src="/logo.png" alt="logo" style={{ width: "100%" }} />
              </Box>
              <Button
                variant="outlined"
                component="label"
                startIcon={<FileUploadIcon />}
                fullWidth
              >
                Upload Image
                <input
                  type="file"
                  name="file"
                  hidden
                  onChange={onUploadChange}
                />
              </Button>
            </div>
            <Divider sx={{ mt: 3 }} />
            <div>
              <Typography variant="h6" component="h2" mt={5} mb={2}>
                Text
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setText(e.target.value)
                }
              />
            </div>
            <Divider sx={{ mt: 3 }} />
            <div>
              <Typography variant="h6" component="h2" mt={5} mb={2}>
                Theme
              </Typography>
              <TextField
                fullWidth
                type="color"
                value={color}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setColor(e.target.value)
                }
              />
            </div>

            <Button
              variant="contained"
              type="submit"
              sx={{ position: "absolute", right: "5%", bottom: "2%" }}
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>

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

        <Box sx={{ position: "fixed", right: "3%", bottom: "3%" }}>
          <Button variant="contained" onClick={handleOpen}>
            <SettingsIcon />
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Layout;
