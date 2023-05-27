import React, { Component } from 'react';
import { Heading } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button,  } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';



import './App.css';


class CheckSpeedOfTyping extends Component {
  state = {
    minutes: 0,
    seconds: 0,
    intervalId: null,
    typingNote: null,
    inputValue: '',
    result: '',
    showPopup: false,
  };

  componentDidMount = () => {
    this.getRandomTypingNote();
  };

  getRandomTypingNote = async () => {
    const response = await fetch('https://apis.ccbp.in/random-quote');
    const data = await response.json();
    this.setState({ typingNote: data.content });
  };

  togglePopup = () => {
    this.setState((prevState) => ({
      showPopup: !prevState.showPopup,
    }));
  };

  onClickInformation = () => {
    this.togglePopup();
  };
  

  startInterval = () => {
    const intervalId = setInterval(() => {
      const { minutes, seconds } = this.state;
      if (seconds < 59) {
        this.setState({ seconds: seconds + 1 });
      } else {
        this.setState({ minutes: minutes + 1, seconds: 0 });
      }
    }, 1000);

    this.setState({ intervalId });
  };

  clearIntervalMethod = () => {
    const { typingNote, inputValue, seconds } = this.state;
    clearInterval(this.state.intervalId);
    this.setState({ intervalId: null });

    if (
      typingNote.trim().toLowerCase() === inputValue.trim().toLowerCase() &&
      seconds < 20
    ) {
      this.setState({ result: 'Great job! Your sentence is correct and completed in less than 20 seconds.' });
    } else if (
        typingNote.trim().toLowerCase() === inputValue.trim().toLowerCase() &&
        seconds >= 20 ){
      this.setState({ result: 'Do better! Your sentence is correct but took more than 20 seconds.' });
    } else {
        this.setState({ result: 'Mismatch! Your sentence is incorrect. Please check it and try again later.' });
    }
  };

  onClickResetAll = () => {
    this.setState({
      minutes: 0,
      seconds: 0,
      intervalId: null,
      typingNote: null,
      inputValue: '',
      result: '',
    });
    this.getRandomTypingNote();
  };

  onChangeInputValue = (event) => {
    this.setState({ inputValue: event.target.value });
  };


  

  render() {
    // other code
    const { showPopup, minutes, seconds, result, typingNote, inputValue } = this.state;
    const formattedTime = `${minutes < 10 ? '0' + minutes : minutes} : ${
      seconds < 10 ? '0' + seconds : seconds
    }`;
  
    return (
      <center >
        <Heading as="cite" size="xl" textDecoration={'underline'} textDecorationColor={"pink"}>
          Simple Speed Typing
        </Heading>
        <div className="Typing-content">
          <Text backgroundColor={'transparent'} fontSize="xl">
            {typingNote}
          </Text>
        </div>
        <div className="timer-box d-flex ">Timer - {formattedTime}</div>
        <div className="button-container">
        <Button
          m={3}
          onClick={this.startInterval}
          colorScheme="teal"
          variant="outline"
          backgroundColor={"black"}
        >
          Click here to Start
        </Button>
        <Button m={2} onClick={this.onClickInformation} colorScheme="black" backgroundColor={'lightblue'} variant="outline">
          Info
        </Button>
        </div>
        <br />
        <div>
          {showPopup && (
            <Modal  isOpen={showPopup} onClose={this.togglePopup}>
              <ModalOverlay />
              <ModalContent >
                <ModalHeader backgroundColor={'gray'}>Information</ModalHeader>
                <ModalBody backgroundColor={"white"} >
                  If the user enters the correct sentence and completes it in less than 20 seconds, the message "Great job! Your sentence is correct and completed in less than 20 seconds" will be displayed. If the user enters the correct sentence but takes more than or equal to 20 seconds, the message "Do better! Your sentence is correct but took more than 20 seconds" will be displayed. If the user's input sentence does not match the given sentence, the message "Mismatch! Your sentence is incorrect. Please check it and try again later" will be displayed.
                </ModalBody>
                <ModalFooter backgroundColor={"gray"}>
                  <Button colorScheme="red" onClick={this.togglePopup}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </div>
        <Textarea
          width={80}
          cols={50}
          rows={5}
          placeholder="Start Here"
          onChange={this.onChangeInputValue}
          value={inputValue}
          isInvalid
        />
        <br />
        <div className="button-container">
          <Button
            m={2}
            onClick={this.clearIntervalMethod}
            colorScheme="teal"
            variant="outline"
            color={"black"}
            backgroundColor={"green"}
          >
            Done
          </Button>
  
          <Button
            m={2}
            onClick={this.onClickResetAll}
            colorScheme="teal"
            variant="outline"
            backgroundColor={"pink"}
          >
            Reset All
          </Button>
        </div>
        {result && (
          <div>
            <Text fontWeight={"bold"} color={"red"} fontSize="lg">
              Your Typing Speed {formattedTime}
            </Text>
            <Text fontFamily={"cursive"} fontSize="lg">
              {result}
            </Text>
          </div>
        )}
      </center>
    );
  }
  
}

export default CheckSpeedOfTyping;


