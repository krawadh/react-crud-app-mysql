import React from "react";
import {
  AppBar,
  Toolbar,
  styled,
  Menu,
  MenuItem,
  IconButton,
  Box,
  Tooltip,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import AddUser from "./AddUser";
import { useAuth } from "../context/AuthContext";

//const pages = ["All Users", "Add User"];
const settings = ["Logout"]; //"Profile", "Account", "Dashboard",

const Header = styled(AppBar)`
  position: static;
`;

const Tab = styled(NavLink)`
  font-size: 20px;
  margin: 20px;
  color: inherit;
  text-decoration: none;
`;

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { openModal } = useModal();
  const { isAuthenticated, logout } = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenAddUserModal = () => {
    openModal(<AddUser />);
    handleCloseNavMenu();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Header>
      <Toolbar>
        <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          LOGO
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              display: { xs: "block", md: "none" },
            }}
          >
            {isAuthenticated ? (
              <MenuItem key="All Users" onClick={handleCloseNavMenu}>
                <Typography textAlign="center" component={Tab} to="/users">
                  All Users
                </Typography>
              </MenuItem>
            ) : (
              ""
            )}

            {isAuthenticated ? (
              <MenuItem key="Add User" onClick={handleOpenAddUserModal}>
                <Typography textAlign="center">Add User</Typography>
              </MenuItem>
            ) : (
              ""
            )}
          </Menu>
        </Box>
        <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          LOGO
        </Typography>
        {isAuthenticated ? (
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="All Users"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              component={Tab}
              to="/users"
            >
              All Users
            </Button>
            <Button
              key="Add User"
              onClick={handleOpenAddUserModal}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Add User
            </Button>
          </Box>
        ) : (
          ""
        )}
        {isAuthenticated ? (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
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
                  {setting === "Logout" ? (
                    <Typography textAlign="center" onClick={handleLogout}>
                      {setting}
                    </Typography>
                  ) : (
                    <Typography textAlign="center">{setting}</Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : (
          ""
        )}
      </Toolbar>
    </Header>
  );
};

export default NavBar;
