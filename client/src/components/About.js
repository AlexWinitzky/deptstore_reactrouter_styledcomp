import React from 'react';
import LeftText from './Styles'


const About = () => (
  <>
    <LeftText tCenter="left">These are elements using the same styled component as the Home route.</LeftText>
    <LeftText tCenter="left">Passing in a different prop conditionally renders to the left rather than center.</LeftText>
  </>
)

export default About
