import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import RandomHouse from '../randomHouse';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';

import './app.css';

export default class App extends Component  {

    state = {
        showRandomChar: true,
        showRandomHouses: true,
        error: false,
        errorForHouse: false,
    }

    onToogleRandomChar = () => {
        this.setState((state) => {
            return {
            showRandomChar: !state.showRandomChar
            }
        });
    }

    onToogleRandomHouses = () => {
        this.setState((state) => {
            return {
                showRandomHouses: !state.showRandomHouses
            }
        });
    }

    render() {
        const {showRandomChar, showRandomHouses, error, errorForHouse} = this.state;
        if (error || errorForHouse) {
            return <ErrorMessage/>
        }
        const char = showRandomChar ? <RandomChar /> :  <div className="toggleChar"></div>;
        const houses = showRandomHouses ? <RandomHouse/> : <div className="toggleHouse"></div>;

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                           {char} 
                                    <button
                                        id='button-first' 
                                        className='toggle-btn'
                                        onClick={this.onToogleRandomChar}>
                                            Toggle random character
                                    </button>
                            
                            {houses}
                                    <button
                                        id='button-second' 
                                        className='toggle-btn'
                                        onClick={this.onToogleRandomHouses}>
                                        Toggle random houses
                                    </button>
                            <div className='both'></div>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
  
};