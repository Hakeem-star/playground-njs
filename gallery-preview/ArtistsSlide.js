import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  flex: 1;
  overflow: hidden;
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: scroll;
  padding-left: 300px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ArtistContainer = styled.div`
  width: 300%;
  flex-shrink: 0;
`;

const Artist = styled.div`
  width: 450px;
  height: 500px;
  border: 1px solid black;
`;

export default function ArtistsSlide({ setArtistSlideMountState }) {
  const scrollPage = useRef(null);

  useEffect(() => {
    setArtistSlideMountState(true);
    // Horizontal scrolling
    scrollPage.current.addEventListener("wheel", (e) => {
      if (e.deltaY > 0) scrollPage.current.scrollLeft += 20;
      else scrollPage.current.scrollLeft -= 20;
    });
  }, []);

  return (
    <Container>
      <ScrollContainer className="ScrollContainer" ref={scrollPage}>
        <ArtistContainer>
          <Artist className="artist" />
        </ArtistContainer>
      </ScrollContainer>
    </Container>
  );
}
