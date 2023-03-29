import React from "react";
import { Button, Card, Container, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { Stack } from "@mui/system";
import axios from "../service/AxiosClient";

const Login = () => {
  const onSubmit = async (values: any) => {
    const {
      status,
      data: { accessToken },
    } = await axios.post("/login", values);

    if (status === 200) {
      localStorage.setItem("token", accessToken);
      window.location.href = "/admin/dashboard";
    }
  };

  const initialValues = {
    email: "admin@blog.com",
    password: "admin",
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ maxWidth: "400px", width: "100%" }}>
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
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  required
                />
                {errors.email && touched.email && errors.email}
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  required
                />
                {errors.password && touched.password && errors.password}
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Login;
