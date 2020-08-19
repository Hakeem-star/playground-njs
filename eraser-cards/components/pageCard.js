import { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

const Card = styled.div`
  position: absolute;
  align-self: flex-start;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ${({ closed }) => {
    if (closed) {
      return css`
        pointer-events: none;
        opacity: 0;
        transition-delay: 0s, 0s;
      `;
    }
    if (!closed) {
      return css`
        opacity: 1;
        overflow-y: auto;
        transition-delay: 0s, 0.4s;
      `;
    }
  }}
  ${({ moveToPosition }) => {
    switch (moveToPosition) {
      case "left":
        return css`
          transform: translateX(-100%);
        `;
      case "right":
        return css`
          transform: translateX(100%);
        `;

      default:
        return css`
          transform: translateX(0%);
        `;
    }
  }}
  transition-property: transform,opacity;
  transition-duration: 0.8s, 0.8s;
  /* transition: all 0.8s ease; */
  /* transition: all 0.8s ease; */
  z-index: 1;
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 100px 0px;
  color: white;
  font-weight: 600;
  font-size: 2rem;
  transform: ${({ moveToPosition }) => {
    switch (moveToPosition) {
      case "left":
        return "translateX(100%)";
      case "right":
        return "translateX(-100%)";

      default:
        return "translateX(0%)";
    }
  }};
  transition: all 0.8s ease;
`;
const ZebraRow = styled.div`
  width: 80%;
  height: 100px;
  background-color: ${({ bgColor }) => bgColor};
  margin: 20px 0;
`;
export default function PageCard({
  hideCard,
  moveToPosition,
  bgColor,
  text,
  closed,
}) {
  let cardBGColour = () => {
    switch (text) {
      case "Abba":
        return "blue";
      case "Coldplay":
        return "Yellow";

      default:
        return "Green";
    }
  };

  const cardRef = useRef(null);

  return (
    <Card
      ref={cardRef}
      className="page-card"
      hideCard={hideCard}
      closed={closed}
      bgColor={bgColor}
      moveToPosition={moveToPosition()}
    >
      <CardContent
        className="page-card__card-content"
        moveToPosition={moveToPosition()}
      >
        <h1>{text}</h1>
        <div>
          <ZebraRow bgColor={cardBGColour()}></ZebraRow>
          <ZebraRow bgColor={cardBGColour()}></ZebraRow>
          <ZebraRow bgColor={cardBGColour()}></ZebraRow>
          <ZebraRow bgColor={cardBGColour()}></ZebraRow>
          <ZebraRow bgColor={cardBGColour()}></ZebraRow>
          <ZebraRow bgColor={cardBGColour()}></ZebraRow>
          <ZebraRow bgColor={cardBGColour()}></ZebraRow>
          <ZebraRow bgColor={cardBGColour()}></ZebraRow>
          <ZebraRow bgColor={cardBGColour()}></ZebraRow>
          <ZebraRow bgColor={cardBGColour()}></ZebraRow>
        </div>
      </CardContent>
    </Card>
  );
}
