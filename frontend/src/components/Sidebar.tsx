import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

const drawerWidth = 240;

const sidebarMenu = [
  {
    text: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
  },
  {
    text: "Exam",
    path: "/exam",
    icon: <ArticleIcon />,
  },
  {
    text: "Qustion Bank",
    path: "/questionbank",
    icon: <HelpCenterIcon />,
  },
  {
    text: "Result",
    path: "/results",
    icon: <FactCheckIcon />,
  },
  {
    text: "Users",
    path: "/users",
    icon: <GroupIcon />,
  },
];

const Sidebar = ({
  handleDrawerToggle,
  mobileOpen,
}: {
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
}) => {
  // Redux hooks
  const { user } = useAppSelector((state: RootState) => state.auth);

  //Router hooks
  const navigate = useNavigate();
  const location = useLocation();

  const signupPath = location.pathname === "/signup";
  const signinPath = location.pathname === "/signin";

  const drawer = (
    <div>
      {/* <Toolbar /> */}
      <Box
        sx={{
          minHeight: 70,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">OEMS</Typography>
      </Box>
      <Divider />
      <List>
        {sidebarMenu.map((menu) => (
          <ListItem button key={menu.text} onClick={() => navigate(menu.path)}>
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  if (signupPath || signinPath || user?.role === "student") return null;

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        displayPrint: "none",
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
