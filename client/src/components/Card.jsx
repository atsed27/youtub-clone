import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: ${(props) => props.type !== 'sm' && '360px'};
  margin-bottom: ${(props) => (props.type === 'sm' ? '10px' : '45px')};
  cursor: pointer;
  display: ${(props) => props.type === 'sm' && 'flex'};
  gap: 10px;
`;
const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === 'sm' ? '120px' : '202px')};
  background-color: #999;
  flex: 1;
`;
const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== 'sm' && '16px'};
  gap: 12px;
  flex: 1;
`;
const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === 'sm' && 'none'};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

function Card({ type, video }) {
  return (
    <Link to="/video/test" style={{ textDecoration: 'none' }}>
      <Container type={type}>
        <Image
          type={type}
          src="https://i.ytimg.com/an_webp/kn8HPNwPEkw/mqdefault_6s.webp?du=3000&sqp=CKyMzaYG&rs=AOn4CLAWln0ATNRcUNRUMAZ1OGxIugqBRg"
        />
        <Details type={type}>
          <ChannelImage src="https://yt3.ggpht.com/ytc/AOPolaToAOoB7zZaRe9kVmXGi6QWBBPrESpK8pcaWnBL=s48-c-k-c0x00ffffff-no-rj" />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName> Dani_code</ChannelName>
            <Info> {video.Views} views . 2 day ago </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}

export default Card;
