import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';


const PageTemplate = ({ children, ...props }) => {
  console.log(props)
  return (
    <div {...props}>
      <AppBar title="My AppBar"/>
      {children}    </div>
  )
}

PageTemplate.propTypes = {
  children: PropTypes.any.isRequired
};

export default PageTemplate
