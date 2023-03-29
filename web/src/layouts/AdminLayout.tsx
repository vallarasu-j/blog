import {
  AppRegistration,
  CreateOutlined,
  Home,
  LoginOutlined,
  MenuRounded,
  Person,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Breadcrumbs,
  Card,
  Grid,
  IconButton,
  List,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getCurrentUser } from "./Services";

export const UserContext = createContext({});

const AdminLayout = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    userData();
  }, []);

  const userData = async () => {
    const { status, data } = await getCurrentUser();
    if (status === 200) {
      setCurrentUser(data?.payload);
    }
  };

  const theme = {
    spacing: 8,
    backgroundColor: "linear-gradient(45deg, #09C6F9 30%, #045DE9 90%)",
  };

  const MenuItems = [
    {
      name: "Dashboard",
      icon: <Home />,
      path: "/admin/dashboard",
    },
    {
      name: "Posts",
      icon: <CreateOutlined />,
      path: "/admin/posts",
    },
    {
      name: "Users",
      icon: <Person />,
      path: "/admin/users",
    },
    {
      name: "Login",
      icon: <LoginOutlined />,
      path: "/login",
    },
    {
      name: "Register",
      icon: <AppRegistration />,
      path: "/register",
    },
  ];

  const globaConfig = {
    currentUser: currentUser,
  };

  return (
    <>
      <UserContext.Provider value={globaConfig}>
        <Grid container>
          <Grid item xs={2}>
            <Card
              sx={{
                height: "100vh",
                backgroundImage:
                  "linear-gradient(45deg, #09C6F9 30%, #045DE9 90%)",
              }}
            >
              <Box>
                <Card
                  sx={{
                    margin: "20px",
                    borderRadius: "5px",
                    backgroundColor: "#F5F6FA",
                    padding: "20px",
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                      }}
                      src={currentUser?.photoUrl || "https://i.pravatar.cc/300"}
                    >
                      {currentUser?.fullName?.charAt(0) || "A"}
                    </Avatar>
                    <Stack direction="column" spacing={0} alignItems="center">
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "Segoe UI",
                        }}
                      >
                        {currentUser?.fullName || "Admin"}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Segoe UI",
                        }}
                      >
                        {currentUser?.email || "email"}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
              </Box>

              {MenuItems.map((item) => {
                return (
                  <MenuItem
                    sx={{
                      borderRadius: "5px",
                      margin: "20px",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#000",
                        boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
                      },
                    }}
                    onClick={() => {
                      window.location.href = item.path;
                    }}
                  >
                    {item.icon}
                    <Box sx={{ width: 10 }} />
                    <Typography
                      sx={{
                        fontFamily: "Segoe UI",
                        fontWeight: "bold",
                        textShadow: "0 0 10px rgba(0,0,0,0.1)",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Card>
          </Grid>

          <Grid item xs={10}>
            <AppBar position="sticky" sx={{ backgroundColor: "#fff" }}>
              <Toolbar>
                <Stack direction="row" spacing={2} alignItems="center">
                  {
                    <h2 style={{ color: "black", fontFamily: "Segoe UI" }}>
                      {
                        // eslint-disable-next-line no-restricted-globals
                        location.pathname
                          .split("/")[2]
                          .charAt(0)
                          .toUpperCase() +
                          // eslint-disable-next-line no-restricted-globals
                          location.pathname.split("/")[2].slice(1)
                      }
                    </h2>
                  }
                  <Breadcrumbs>
                    {
                      // eslint-disable-next-line no-restricted-globals
                      location.pathname.split("/").map((path, index) => {
                        if (path) {
                          return (
                            <Typography
                              key={index}
                              sx={{
                                color: "gray.100",
                                fontFamily: "Segoe UI",
                              }}
                            >
                              {path}
                            </Typography>
                          );
                        }
                      })
                    }
                  </Breadcrumbs>
                </Stack>
              </Toolbar>
            </AppBar>
            <Card
              sx={{
                height: "100vh",
                borderRadius: "10px",
                margin: "20px",
                backgroundColor: "#F5F6FA",
              }}
            >
              <Box
                sx={{
                  padding: "20px",
                }}
              ></Box>
              <Outlet />
            </Card>
          </Grid>
        </Grid>
      </UserContext.Provider>
    </>
  );
};

export default AdminLayout;
