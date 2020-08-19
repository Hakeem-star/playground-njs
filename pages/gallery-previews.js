import React, { useEffect, useState } from "react";
import GalleryPreviewCardsList from "../gallery-preview/components/GalleryPreviewCardsList";
import styled from "styled-components";
import ArtistsSlide from "../gallery-preview/ArtistsSlide";

export const ArtistCardContext = React.createContext();

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
`;

export default function GalleryPreview() {
  const [
    intersectingWithArtistProfileState,
    setintersectingWithArtistProfileState,
  ] = useState(false);
  const [artistSlideMountState, setArtistSlideMountState] = useState(false);

  useEffect(() => {
    //get the width of the screen
    //get the width of the preview bars
    //use both to calculate page margins
  }, []);

  return (
    <Container>
      <ArtistCardContext.Provider value={artistSlideMountState}>
        <GalleryPreviewCardsList></GalleryPreviewCardsList>
        <ArtistsSlide setArtistSlideMountState={setArtistSlideMountState} />
      </ArtistCardContext.Provider>
      {/* <div
        style={{
          position: "absolute",
          padding: `0px -${1920 - 240}px 0px 160px`,
          backgroundColor: "blue",
          width: "100%",
          height: "100%",
        }}
      ></div> */}
    </Container>
  );
}
