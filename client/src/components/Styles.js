import styled from 'styled-components';

  const textAlignment = (text) => {
    switch (text) {
      case "center":
        return "center";
      case "left":
        return "left";
      default:
        return "right";
    }
  }


export default styled.h1`
  margin-top: 100px;
  text-align: ${ props => textAlignment(props.tCenter)} !important;
  `
