import React from 'react'
import styled from 'styled-components'
import { Copy, H1, HamburgerButton, HeroBanner, ImageWithCaption, MainContent, Navbar, Stripe, TwoColumnLayout } from 'components'
import { generateLoremIpsum } from 'utilities'

const StPageWrapper = styled.div`
  display: block;
`


export default class ViewSampleStretched3C extends React.Component {
  constructor() {
    super();
    this.state = {
      hamburgerClicked: false
    }
  }

  render() {
    return (
      <StPageWrapper>
        <Navbar
          bgColor='#AC370D'
          sticky
          groupRight={
            <div>
              <span>A Sticky Navbar</span>
            </div>
          }
          groupLeft={
            <HamburgerButton
              onHamburgerButtonClick={() => {
                this.setState({
                  hamburgerClicked: !this.state.hambugerClicked
                });}}>
            </HamburgerButton>
          }>
        </Navbar>
        <HeroBanner
          header='A Header'
          headerColor='#'
          headerFontSize='6rem'
          headerLeft='2rem'
          headerTextAlign='right'
          headerTop='40%'
          src={'./img/sample-hero-banner-04.jpg'}
          subheader='Followed By a Subheader'/>
        <MainContent>
          <Copy
            columns={3}
            stylizeFirstLetter>
            { generateLoremIpsum(3) }
          </Copy>
          <TwoColumnLayout>
            <ImageWithCaption
              src={'./img/sample-hero-banner-03.jpg'}
              centeredHorizontally>
              Fig 1.1: A caption that really explains some things.
            </ImageWithCaption>
            <Copy>
              { generateLoremIpsum(2) }
            </Copy>
          </TwoColumnLayout>
        </MainContent>
        <Stripe
          bgColor='#AC370D'>
          <H1
            textColor='#FFF'
            withUnderline>
            Lorem Ipsum
          </H1>
          <Copy
            columns={3}
            textColor='#FFF'>
            { generateLoremIpsum(4) }
          </Copy>
        </Stripe>
      </StPageWrapper>
    );
  }
}
