import { MoreVertOutlined } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Avatar,
  CardHeader,
  IconButton,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

const Post = (props: any) => {
  const { postUrl, title, desc, date, author } = props;

  return (
    <Card sx={{ maxWidth: 345, margin: "auto", mb: 2 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{author?.profile}</Avatar>}
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertOutlined />
        //   </IconButton>
        // }
        title={author}
        subheader={date}
      />
      <CardMedia component="img" height="194" image={postUrl} alt="blog" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary" component="div">
          {desc}
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  );
};

export default Post;
