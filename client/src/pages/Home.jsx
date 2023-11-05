import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
function Home({ type }) {
  const [videos, setVideo] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`http://localhost:5001/api/videos/${type}`);
      setVideo(res.data);
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
}

export default Home;
