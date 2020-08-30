import React, {Component} from 'react';
import './randomChar.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types'


export default class RandomChar extends Component {
    // constructor() {
    //     super();
    //     console.log('constructor');
    // }
    
    gotService = new GotService();

    state = {
        char: {},
        loading: true,
        error: false,
    }

    static defaultProps = {
        interval: 10000,
    }

    componentDidMount() {
        const {interval} = this.props;
        console.log('mounting');
        this.updateChar();
        this.timerId = setInterval(this.updateChar, interval);
    }

    componentWillUnmount() {
        console.log('unmounting');
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = () => {
        //console.log('updateChar');
        const id = Math.floor(Math.random()*150 + 45);
        //const id = 50000000000000;
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        console.log('render');

        const {char,loading, error} = this.state;
    
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner /> : null;
        const content =  !(loading || error) ? <Character char={char}/> : null;
        
        return (
            <>
                 <div className="random-block rounded">
                    {errorMessage}
                    {spinner}
                    {content}
                </div>
            </>
        );
    }
}

// RandomChar.defaultProps = {
//     interval: 10000,
// }

RandomChar.propTypes = {
    interval: PropTypes.number
}

// RandomChar.propTypes = {
//     interval: (props, propName, componentName) => {
//         const value = props[propName];

//         if (typeof value === 'number' && !isNaN(value)) {
//             return null
//         }
//         return new TypeError(`${componentName}: ${propName} must be a number`)

//     }    
// }

const Character = ({char}) => {
    const { name, gender, born, died, culture } = char;

    return (
        <>
            <h4>Random Character: <br/> {name}</h4>
                <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}