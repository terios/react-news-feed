import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import styled from 'styled-components'


const Header = ({ ...props }) => {
  return (
    <AppBar
    title="Title"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
    )
}

export default Header;
