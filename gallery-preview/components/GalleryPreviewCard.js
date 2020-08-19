import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import buildPreviewCardIntersectionObserver from "../utils/buildPreviewCardIntersectionObserver";
import { ArtistCardContext } from "../../pages/gallery-previews";

const cardWidth = 80;

export const GalleryPreviewCardStyled = styled(GalleryPreviewCard)`
  height: 100%;
  /* background-color: grey; */
  /* box-shadow: black 3px 0px 15px 0px; */
  border-right: 0.5px solid black;
  z-index: ${(props) => props.depth};
  overflow: hidden;
`;

const GalleryPreviewCardOutside = styled.div`
  width: ${cardWidth}px;
  &:hover {
    width: 450px;

    .card-image-container {
      .card-image {
        transform: scale(1.5);
      }
    }

    div {
      padding: 0 !important;
      transform: translateX(0) !important;
    }
  }

  div {
    transition: all 0.5s ease-out;
  }
  transition: width 0.8s ease;

  .card-image-container {
    transition: width 0.8s ease;
  }
  .card-image {
    transition: transform 0.8s ease, margin 0.8s ease;
  }
`;

const GalleryPreviewCardInside = styled.div`
  width: 660px;
  height: 100%;
  padding: 0 ${cardWidth}px;
  transform: ${(props) => {
    return `translate3D(${props.translateX}px,0,0);`;
  }};
`;

function GalleryPreviewCard({ depth, className, image }) {
  const artistCardMounted = useContext(ArtistCardContext);
  const [
    intersectingWithArtistProfileState,
    setIntersectingWithArtistProfileState,
  ] = useState({
    entry: { intersectionRatio: 0 },
    width: 0,
    leftPosition: 0,
  });
  const touchingOuterRef = useRef(intersectingWithArtistProfileState);
  const previousTouchingOuterRefValue = useRef(touchingOuterRef);

  const GalleryPreviewCardScrollContainerRef = useRef(null);
  const GalleryPreviewCardInner = useRef(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    //Ref is being updated by the useEffect so the queryselector doesn't have to keep updating
    touchingOuterRef.current = intersectingWithArtistProfileState;
    //intersectingWithArtistProfileState changes before the scroll updates, so we need to move the image here first
    /*
    The intersection observer notices the intersections after the scroll has happened, 
    so the entrance and leaving needs to be cleaned up here  for instances where the scroll doesn't calculate correctly
    */
    const card = GalleryPreviewCardInner.current;
    console.log(
      touchingOuterRef.current.entry.intersectionRatio,
      previousTouchingOuterRefValue.current.entry.intersectionRatio,
      touchingOuterRef.current.leftPosition,
      touchingOuterRef.current.width
    );
    //If we have entered a card
    if (
      touchingOuterRef.current.entry.intersectionRatio &&
      !previousTouchingOuterRefValue.current.entry.intersectionRatio
    ) {
      // console.log(
      //   "HERE",
      //   touchingOuterRef.current.leftPosition,
      //   touchingOuterRef.current.width
      // );
      //Initial move upon entering
      if (touchingOuterRef.current.leftPosition > 0) {
        setTranslateX((val) => val - touchingOuterRef.current.width);
      } else {
        setTranslateX((val) => {
          return val + touchingOuterRef.current.width;
        });
      }
      //If we have left a card
    } else if (
      !touchingOuterRef.current.entry.intersectionRatio &&
      previousTouchingOuterRefValue.current.entry.intersectionRatio
    ) {
      if (
        touchingOuterRef.current.leftPosition <
        previousTouchingOuterRefValue.current.leftPosition
      ) {
        //we've exited to the left
        setTranslateX((660 - 80) * -1);
      } else {
        //we've exited to the right
        setTranslateX(0);
      }
    }
  }, [intersectingWithArtistProfileState]);

  useEffect(() => {
    //Check to make sure the artist slides are mounted
    if (artistCardMounted)
      buildPreviewCardIntersectionObserver(
        GalleryPreviewCardScrollContainerRef,
        setIntersectingWithArtistProfileState
      );
  }, [artistCardMounted]);

  useEffect(() => {
    //Listeners on mount
    function wheelListener(e) {
      //Adding this fixes the jitterness
      // console.log(getComputedStyle(GalleryPreviewCardInner.current).transform);
      // console.log(touchingOuterRef.current, e.deltaY);
      // debugger;
      if (touchingOuterRef.current.width) {
        if (e.deltaY > 0) {
          // translateX
          setTranslateX((val) => {
            return val - 20;
          });
        } else {
          setTranslateX((val) => {
            return val + 20;
          });
        }
      }
    }

    function keyDownListener(e) {
      const card = GalleryPreviewCardInner.current;

      if (touchingOuterRef.current.width) {
        if (e.keyCode === 39) {
          setTranslateX((val) => {
            return val - 20;
          });
        } else if (e.keyCode === 37) {
          setTranslateX((val) => {
            return val + 20;
          });
        }
      }
    }
    //Horizontal scrolling
    if (GalleryPreviewCardInner.current !== null) {
      document
        .querySelector(".ScrollContainer")
        .addEventListener("wheel", wheelListener);

      document.addEventListener("keydown", keyDownListener);
    }
  }, []);

  previousTouchingOuterRefValue.current = touchingOuterRef.current;

  return (
    <GalleryPreviewCardOutside
      className={className}
      depth={depth}
      ref={GalleryPreviewCardScrollContainerRef}
    >
      <GalleryPreviewCardInside
        translateX={translateX}
        ref={GalleryPreviewCardInner}
        className="card-image-inner"
      >
        <div
          className="card-image"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            width: "100%",
            height: "100%",
          }}
        ></div>
      </GalleryPreviewCardInside>
    </GalleryPreviewCardOutside>
  );
}
