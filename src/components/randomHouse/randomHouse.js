import React, {Component} from 'react';
import './randomHouse.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';


export default class RandomHouse extends Component {
    // constructor() {
    //     super();
    //     this.updateHouse();
    // }
    
    gotService = new GotService();

    state = {
        houses: {},
        loading: true,
        errorForHouse: false,
    }

    static defaultProps = {
        interval: 10000,
    }

    componentDidMount = () => {
        const {interval} = this.props;
        console.log('mounting');
        this.updateHouse();
        this.timerId = setInterval(this.updateHouse, interval);
    }

    componentWillMount = () => {
        console.log('unmounting');
        clearInterval(this.timerId);
    }

    onHouseLoaded = (houses) => {
        this.setState({
            houses,
            loading: false,
        });
    }

    onErrorHouse = () => {
        this.setState({
            errorForHouse: true,
            loading: false
        })
    }

    updateHouse = () => {
        //const id = 50000000000000;
        //const id = 378;
        const id = Math.floor(Math.random()*378 + 45);
        this.gotService.getHouse(id)
            .then(this.onHouseLoaded)
            .catch(this.onErrorHouse);
    }

    render() {
        const {houses, loading, errorForHouse} = this.state;
    
        const errorHouse = errorForHouse ? <ErrorMessage/> : null; ;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || errorForHouse) ? <Houses houses={houses}/> : null;

        return (
            <>
                <div className="random-block rounded" id='houses'>
                    {errorHouse}
                    {spinner}
                    {content} 
                </div>
            </>
        );
    }
}

RandomHouse.propTypes = {
    interval: PropTypes.number
}

const Houses = ({houses}) => {
    const { name, region, words, diedOut, founded } = houses;
    return (
        <>
            <h4>Random Houses: <br/> {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Region </span>
                    <span>{region}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Words</span>
                    <span>{words}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Founded </span>
                    <span>{founded}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died Out</span>
                    <span id="titles">{diedOut}</span>
                </li>
            </ul>
        </>
    )
}