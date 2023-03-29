import React, { useContext, useEffect } from "react";
import { Container } from "@mui/system";
import Post from "../components/Post";
import { getPosts } from "./Services";
import { UserContext } from "../layouts/UserLayout";

const Home = () => {
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const contextData = useContext<any>(UserContext);

  useEffect(() => {
    getData();
  }, [contextData?.refresh]);

  const getData = async () => {
    setLoading(true);
    const response = await getPosts();
    setData(response);
    setLoading(false);
  };
  return (
    <div>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        {loading && <p>Loading...</p>}
        {data.map((post: any) => {
          return <Post {...post} />;
        })}
      </Container>
    </div>
  );
};

export default Home;
