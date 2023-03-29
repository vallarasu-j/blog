import { Container, Stack, Typography, TextField, Button } from "@mui/material";
import { Formik } from "formik";
import axios from "../service/AxiosClient";

const Register = () => {
  const onSubmit = async (values: any) => {
    const {
      status,
      
    } = await axios.post("/register", values);

    if (status === 200) {
      window.location.href = "/login";
    }

  };

  const initialValues = {
    email: "admin@blog.com",
    password: "admin",
    username: "admin",
    fullName: "Admin Blog"
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
                  name="fullName"
                  label="Full Name"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                  required
                />
                <TextField
                  name="username"
                  label="Username"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  required
                />
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
                  Register
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Register;
