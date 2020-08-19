import styled from "styled-components";
import Link from "next/link";

const HeaderComp = styled.header`
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  background-color: black;
  color: white;
  font-size: 1rem;
  div {
    color: white;
    border-right: 1px solid white;
    height: 100%;
    padding: 10px;
  }
`;

const HeaderPageLinkContainer = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  li {
    margin: 0 10px;
  }
`;

export default function Header() {
  return (
    <HeaderComp>
      <div>
        <Link href="/">
          <a>Playground</a>
        </Link>
      </div>
      <HeaderPageLinkContainer>
        <li>
          <Link href="/eraser-cards">
            <a>Eraser cards</a>
          </Link>
        </li>
        <li>
          <Link href="/gallery-previews">
            <a>Gallery previews</a>
          </Link>
        </li>
      </HeaderPageLinkContainer>
    </HeaderComp>
  );
}
