import React, { useState, useEffect, useRef } from "react";
import styled, { ThemeProvider, css, keyframes } from "styled-components";

const Container = styled.div`
  cursor: pointer;
  position: absolute;
  align-self: flex-start;
  display: flex;
  /* Control position on minimise */
  ${({ theme, mounted }) => {
    const { closed, slide } = theme;
    if (closed) {
      const yPosition = () => {
        if (mounted) {
          const windowHeight = window.innerHeight;
          const pageYPosition = windowHeight / 2;
          return pageYPosition;
        } else return 0;
      };

      try {
        console.log(yPosition());
      } catch {
        console.log("nope");
      }
      const offset = Container;
      console.log(offset);
      return css`
        transform: translateY(${yPosition()}px) scale(0.2);
        transition-delay: 0.4s;
      `;
    } else {
      return css`
        transition-delay: 0s;

        transform: translateX(${(slide - 2) * -33.3333}%) scale(1);
      `;
    }
  }};
  transition-property: transform;
  transition-duration: 0.8s;
`;

const Tile = styled.div`
  width: 100vw;
  height: 900px;
  transform: scale(0.98) translateY(30px);
  background-color: ${({ bgColor }) => bgColor};
  &:hover {
    ${(props) => {
      return props.theme.closed && "transform: translateY(-30px);";
    }}
  }
  transition: all 0.4s ease;
`;

function opening(setShowCard) {
  return (e) => {
    if (e.propertyName === "transform" && e.elapsedTime === 0.8) {
      console.log(e); //showState+
      setShowCard((state) => {
        if (state === false) {
          return true;
        } else return false;
      });
    }
  };
}

export default function BackgroundTiles({
  setClosed,
  setSlide,
  slide,
  closed,
  move,
  setShowCard,
  setHideCard,
}) {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(null);

  useEffect(() => {
    setMounted(containerRef.current.getBoundingClientRect());
  }, []);

  return (
    <ThemeProvider theme={{ closed, slide, move }}>
      <Container
        ref={containerRef}
        mounted={mounted}
        className="bg-tiles-container"
      >
        <Tile
          onClick={() => {
            setClosed(false);
            setSlide(1);
          }}
          bgColor={"red"}
        ></Tile>
        <Tile
          onClick={() => {
            console.log("HEAR ME");
            setClosed(false);
            setSlide(2);
          }}
          bgColor={"green"}
        ></Tile>
        <Tile
          onClick={() => {
            setClosed(false);
            setSlide(3);
          }}
          bgColor={"blue"}
        ></Tile>
      </Container>
    </ThemeProvider>
  );
}
