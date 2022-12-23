import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background: #1190f2;
  color: white;
  border: none;
  border-radius: 2px;
  padding: 4px 12px;
  margin: 5px;
  cursor: pointer;
`;
type ButtonProps = {
  text: string;
};
export const Button = (props: ButtonProps) => {
  const { text } = props;
  return <StyledButton> {text} </StyledButton>;
};
