import {
  AppBar,
  Toolbar,
  Button,
  Modal,
  TextField,
  Stack,
  Typography,
  Card,
} from "@mui/material";
import { Formik } from "formik";
import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "../service/AxiosClient";
import { getCurrentUser } from "./Services";

export const UserContext = createContext({});

const UserLayout = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [postModal, setPostModal] = useState(false);

  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    userData();
  }, [refresh]);

  const userData = async () => {
    const { status, data } = await getCurrentUser();
    if (status === 200) {
      setCurrentUser(data?.payload);
    }
  };

  const onSubmit = async (values: any) => {
    const {
       data : {status}
    } = await axios.post("/posts", values);

    if (status === 1) {
      setRefresh(refresh + 1);
      setPostModal(false);
    }

  };

  const initialValues = {
    title: "This is a title",
    desc: "This is a description",
  };

  return (
    <>
      <UserContext.Provider value={{
        currentUser,
        setRefresh,
        refresh
      }}>
        <AppBar position="sticky">
          <Toolbar>
            <h1>Blog</h1>
            <div style={{ marginLeft: "auto" }}>
              {currentUser ? (
                <>
                  <Button color="inherit" onClick={() => setPostModal(true)}>
                    Add Post
                  </Button>

                  <Button color="inherit">{currentUser.name}</Button>

                  <Button
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.href = "/";
                    }}
                    color="inherit"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button href="/login" color="inherit">
                    Login
                  </Button>
                  <Button href="/register" color="inherit">
                    Register
                  </Button>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Outlet />

        <Modal open={postModal} onClose={() => setPostModal(false)}>
          <div >
            <Card sx={{ p: 2, width: "400px", margin: "auto", mt: "100px" }}>
              <Typography variant="h4" sx={{ textAlign: "center" }}>
                Add Post
              </Typography>
              <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                      <Typography variant="h4" sx={{ textAlign: "center" }}>
                        Blog
                      </Typography>
                      <TextField
                        type="title"
                        name="title"
                        label="title"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        required
                      />
                      {errors.title && touched.title && errors.title}
                      <TextField
                        type="desc"
                        name="desc"
                        label="desc"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.desc}
                        required
                      />
                      {errors.desc && touched.desc && errors.desc}
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Post
                      </Button>
                    </Stack>
                  </form>
                )}
              </Formik>
            </Card>
          </div>
        </Modal>
      </UserContext.Provider>
    </>
  );
};

export default UserLayout;
