import React, { useState } from "react";
import styled from "styled-components";

const red = { primary: "255, 90, 120", secondary: "150, 50, 60" };
const green = { primary: "34, 139, 34", secondary: "60, 179, 113" };

const BigButton = ({ buttonID }) => {
  const [currentColour, setCurrentColour] = useState(red);
  const changeColour = () => {
    setCurrentColour(currentColour == red ? green : red);
  };
  return (
    <StyledWrapper
      style={{
        "--primary": currentColour.primary,
        "--secondary": currentColour.secondary,
      }}
    >
      <button onClick={changeColour} className="btn-class-name">
        <span className="back" />
        <span className="front" />
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn-class-name {
    width: 60px;
    height: 50px;
    border: none;
    outline: none;
    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
    outline: 10px solid rgb(var(--primary), 0.5);
    border-radius: 100%;
    position: relative;
    transition: 0.3s;
  }

  .btn-class-name .back {
    background: rgb(var(--secondary));
    border-radius: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .btn-class-name .front {
    background: linear-gradient(
      0deg,
      rgba(var(--primary), 0.6) 20%,
      rgba(var(--primary)) 50%
    );
    box-shadow: 0 0.5em 1em -0.2em rgba(var(--secondary), 0.5);
    border-radius: 100%;
    position: absolute;
    border: 1px solid rgb(var(--secondary));
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 600;
    font-family: inherit;
    transform: translateY(-15%);
    transition: 0.15s;
    color: rgb(var(--secondary));
  }

  .btn-class-name:active .front {
    transform: translateY(0%);
    box-shadow: 0 0;
  }
`;

export default BigButton;
