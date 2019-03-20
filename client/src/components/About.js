import React from 'react';
import CenterText from './Styles'


const About = () => (
  <>
  <CenterText tCenter="left">These are elements using the same styled component as the Home route.</CenterText>
  <CenterText tCenter="left">Passing in a different prop conditionally renders to the left rather than center.</CenterText>
  </>
)

export default About
