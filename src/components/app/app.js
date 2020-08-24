import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import RandomHouse from '../randomHouse';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BooksPage, BooksItem, HousesPage, HousesItem } from '../pages';
import GotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';


import './app.css';

export default class App extends Component  {

    gotService = new GotService();

    state = {
        showRandomChar: true,
        showRandomHouses: true,
        error: false,
        errorForHouse: false,
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    onToggleRandomChar = () => {
        this.setState((state) => {
            return {
            showRandomChar: !state.showRandomChar
            }
        });
    }

    onToggleRandomHouses = () => {
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
            <Router>
                <div className='app'>
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                            {char} 
                                    <button
                                        id='button-first' 
                                        className='toggle-btn'
                                        onClick={this.onToggleRandomChar}>
                                            Toggle random character
                                    </button>
                                
                            {houses}
                                    <button
                                        id='button-second' 
                                        className='toggle-btn'
                                        onClick={this.onToggleRandomHouses}>
                                        Toggle random houses
                                    </button>
                            <div className='both'></div>
                            
                        <Route path='/' component={ () => <h1 id='welcome'> Welcome to my project: Game Of Thrones Data Base </h1>} exact />
                        <Route path='/characters' component={CharacterPage} />
                        <Route path='/books' component={BooksPage} exact/>
                        <Route path='/books/:id' render={({match}) => {
                            const {id} = match.params;
                        return <BooksItem bookId={id} /> }} />
                        <Route path='/houses' component={HousesPage} exact />
                        <Route path='/houses/:id' render={({match}) => {
                            const {id} = match.params;
                        return <HousesItem houseId={id} /> }} />
                            
                    </Container>
                </div>
            </Router>
        );
    }
  
};