import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router';

const Content = styled.section`
   font-family: roboto;
`

const PageTemplate = ({header, children, ...props }) => {
  return (
      <div {...props}>
        <header>{header}</header>
        <Content>{children}</Content>
      </div>
  )
}


PageTemplate.propTypes = {
  header: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired
}

export default PageTemplate
