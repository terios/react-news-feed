import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';


const Content = styled.section`
   font-family: roboto;
`

const PageTemplate = ({ children, ...props }) => {
  console.log(props)
  return (
    <Content {...props}>
      <AppBar title="Title in here"/>
      {children}    </Content>
  )
}

PageTemplate.propTypes = {
  children: PropTypes.any.isRequired
};

export default PageTemplate
