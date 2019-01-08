import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'



const StInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 2.25rem;
  border: ${props => props.borderless ? '0' : (
    props.error && props.error !== '' ? '1px solid red' :
    (props.borderColor ? '1px solid' + props.borderColor : '1px solid #CCC'))};
  border-radius: 4px;
  margin-top: 2rem;
  background-color: ${props => props.errorMessage && props.displayValue && props.displayValue.length > 0 && props.errorMessage.length > 0 ? 'rgba(255,0,0,0.1)' : (props.bgColor ? props.bgColor : (props.inputActive ? '#FFF' : '#F2F2F2'))};
  transition: background-color linear .25s;
`

const StInput = styled.input`
  position: absolute;
  outline: none;
  background: transparent;
  border: 0px;
  height: 98%;
  width: 100%;
  padding-left: 1rem;
`

const StLabel = styled.p`
  opacity: ${props => props.inputActive ? '0' : '1'};
  transform: ${props => props.inputActive ? 'rotateY(-180deg)' : 'rotateY(0deg)'};
  position: absolute;
  left: 1rem;
  font-size: .65rem;
  color: ${props => props.labelColor ? props.labelColor : '#555'};
  letter-spacing: .125rem;
  transition: all .25s linear;
  line-height: 2rem;
  pointer-events: none;
`

const StActiveLabel = styled.p`
  opacity: ${props => props.inputActive ? '1' : '0'};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: absolute;
  top: -1.25rem;
  color: ${props => props.activeLabelColor ? props.activeLabelColor : '#333'};
  left: .25rem;
  left: ${props => props.inputActive ? '.25rem' : '25%'};
  font-size: .65rem;
  letter-spacing: .125rem;
  transition: all .15s linear;
  pointer-events: none;
`

export default class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      displayValue: '',
      inputActive: false,
      realValue: '',
    };
  }

  
  handleOnChange = (e) => {
    //------------------------------------------------------------------------------------
    // Among the first things we need to do is maintain a copy of the actual value of the
    // Input component. We can't rely on the input's content, because it might be masked.
    //------------------------------------------------------------------------------------
    let displayValue = '',
        inputReceived = e.target.value,
        realValue = inputReceived.length - 1 >= 0 ? (
                      inputReceived[inputReceived.length - 1] === '*' ? 
                          this.state.realValue.substring(0, this.state.realValue.length - 1) : 
                          this.state.realValue + inputReceived[inputReceived.length - 1]) : 
                      '';

    realValue = this.props.validateInput ? this.props.validateInput(realValue, this.props.schema) : realValue;
    displayValue = this.props.maskInput ? this.props.maskInput(realValue) : realValue;
    
    this.setState({
      realValue,
      displayValue,
    }, () => {
      this.props.updateForm && this.props.updateForm(this.props.inputID, this.state.realValue);
    });

    e.stopPropagation();
  }

  handleOnFocus = () => {
    this.setState({
      inputActive: true
    });
  }

  handleOnBlur = () => {
    if (this.state.realValue === '') {
      this.setState({
        inputActive: false
      });
    }
  }

  render() {
    return (
      <StInputWrapper
        bgColor={this.props.bgColor}
        borderless={this.props.borderless}
        borderColor={this.props.borderColor}
        displayValue={this.state.displayValue}
        errorMessage={this.props.errorMessage}
        inputActive={this.state.inputActive}
        onChange={this.handleOnChange}>
        <StInput
          onBlur={this.handleOnBlur}
          onChange={this.handleOnChange}
          onFocus={this.handleOnFocus}
          value={this.state.displayValue}/>
        <StLabel
          labelColor={this.props.labelColor}
          inputActive={this.state.inputActive}>
          { this.props.label }
        </StLabel>
        { this.props.errorMessage && this.state.displayValue.length > 0 && this.props.errorMessage.length > 0 ?
          <StActiveLabel
            activeLabelColor='#C45256'
            inputActive={true}>
            { this.props.errorMessage }
          </StActiveLabel> :
          <StActiveLabel
            activeLabelColor={this.props.activeLabelColor}
            inputActive={this.state.inputActive}>
            { this.props.label }
          </StActiveLabel> }
        { this.props.children }
      </StInputWrapper>
    );
  }
}


Input.propTypes = {
  activeLabelColor: PropTypes.string,
  bgColor: PropTypes.string,
  borderless: PropTypes.bool,
  borderColor: PropTypes.string,
  handleInputReceived: PropTypes.func,
  inputID: PropTypes.string,
  labelColor: PropTypes.string,
}
