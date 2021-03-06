import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'



const StSingleColumnWithSidebar = styled.div`
  display: grid; 
  grid-template-columns: 15rem 1fr;
  grid-template-rows: 1fr;

  .main-content {
    grid-column: 2 / span 1;
  }

  .sidebar {
    grid-column: 1 / span 1;
    min-height: calc(100vh); 
  }

  @media(max-width: 1024px) {
    grid-template-columns: 1fr;

    .sidebar {
      position: absolute;
      top: 0;
      left: -17rem;
      width: 17rem;
      z-index: 1000;
    }
  }
`

export default function SingleColumnWithSidebar(props) {
  return (
    <StSingleColumnWithSidebar>
      { props.children }
    </StSingleColumnWithSidebar>
  );
}

SingleColumnWithSidebar.propTypes = {
  children: PropTypes.node.isRequired,
}
