import { useState, useEffect } from "react";
import styled from "styled-components";
import PageCard from "../eraser-cards/components/pageCard";
import BackgroundTiles from "../eraser-cards/components/BackgroundTiles";

export const animateContext = React.createContext(false);

const MainComp = styled.main`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const Button = styled.button`
  height: 30px;
  width: 60px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 530px;
  height: 100px;
  width: 60px;
  z-index: 3;
`;

function EraserCards() {
  const [move, setMove] = useState({ 1: true, 2: false, 3: false });
  const [slide, setSlide] = useState(1);
  const [closed, setClosed] = useState(true);
  const [hideCard, setHideCard] = useState(true);

  useEffect(() => {
    setMove((state) => {
      const placeholder = { 1: false, 2: false, 3: false };
      const newState = { ...placeholder, [slide]: true };
      return newState;
    });
  }, [slide]);

  return (
    <>
      <MainComp>
        <animateContext.Provider value={{ move, closed }}>
          <PageCard
            hideCard={hideCard}
            closed={closed}
            text={"Abba"}
            moveToPosition={() =>
              !move["2"] && !move["3"] ? "center" : "left"
            }
          />

          <PageCard
            hideCard={hideCard}
            closed={closed}
            text={"Coldplay"}
            moveToPosition={() => {
              if (move["2"]) {
                return "center";
              } else if (move["1"]) {
                return "right";
              } else {
                return "left";
              }
            }}
          />

          <PageCard
            hideCard={hideCard}
            closed={closed}
            text={"Outkast"}
            moveToPosition={() => {
              if (move["3"]) {
                return "center";
              } else {
                return "right";
              }
            }}
          />
        </animateContext.Provider>
        <ButtonContainer>
          <Button
            onClick={() => {
              //if it's open
              //show card
              setClosed((state) => (state ? false : true));
            }}
          >
            Toggle
          </Button>
          <Button
            onClick={() => {
              setSlide((value) => {
                return value < 3 ? ++value : value;
              });
            }}
          >
            Next
          </Button>
          <Button
            onClick={() => {
              setSlide((value) => (value > 1 ? --value : value));
            }}
          >
            Previous
          </Button>
        </ButtonContainer>
        <BackgroundTiles
          setHideCard={setHideCard}
          hideCard={hideCard}
          setSlide={setSlide}
          slide={slide}
          setClosed={setClosed}
          closed={closed}
          move={move}
        />
      </MainComp>
    </>
  );
}

export default EraserCards;
