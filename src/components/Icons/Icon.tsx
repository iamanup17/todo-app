import React from "react";
import styled from "styled-components";

const StyledIcon = styled.span`
`;

const Icon = (props: any) => {
  return (
    <StyledIcon>
      <span
        style={{
          fontSize: "1.4rem",
          margin: "4px 2px 0px 5px",
          borderRadius: "50%",
          padding: "5px",
          background: "#ffffff",
          boxShadow: "5px 5px 10px #dedede, -5px -5px 10px #ffffff",
        }}
      >
        {props.text}
      </span>
    </StyledIcon>
  );
};

export default Icon;
