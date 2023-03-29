import { People, PostAdd } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const Dashborad = (props: any) => {
  const widgets = [
    {
      name: "posts",
      title: "Posts",
      value: 100,
      icon: (
        <PostAdd
          sx={{
            fontSize: "3rem",
          }}
        />
      ),
      color: "linear-gradient(45deg, #FFAFBD 30%, #ffc3a0 90%)",
    },
    {
      name: "users",
      title: "Users",
      value: 10,
      icon: (
        <People
          sx={{
            fontSize: "3rem",
          }}
        />
      ),
      color: "linear-gradient(45deg, #6190E8 30%, #A7BFE8 90%)",
    },
  ];

  return (
    <Container>
      <Box sx={{ marginTop: "1rem" }}></Box>

      <Grid container spacing={2}>
        {widgets.map((widget) => {
          return <Widget widget={widget} />;
        })}
      </Grid>
    </Container>
  );
};

export default Dashborad;

export const Widget = (props: any) => {
  const { widget } = props;

  return (
    <Grid item xs={3}>
      <Card
        sx={{
          borderRadius: "15px",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          color: "#fff",
          backgroundImage: widget.color,
          "&:hover": {
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
          },
        }}
      >
        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {widget.icon}
          </Box>
          <Stack direction="column">
            <Typography
              align="center"
              sx={{
                fontWeight: "bold",
                fontFamily: "Segoe UI",
              }}
            >
              {widget.title}
            </Typography>
            <Typography
              align="center"
              sx={{
                fontFamily: "Segoe UI",
                fontSize: "1.8rem",
                fontWeight: "bold",
              }}
            >
              {widget.value}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );
};
