import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';
import PropTypes from 'prop-types';

import './characterPage.css';
export default class CharacterPage extends Component {
    gotService = new GotService();

    state = {
        selectedChar: null,
        error: false
    }

    static defaultProps = {
        onItemSelected: () => {}
    }
    
    static propTypes = {
        onItemSelected: PropTypes.func,
        //getData: PropTypes.arrayOf(PropTypes.object)
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        const {error} = this.state;
        if (error) {
            return <ErrorMessage />
        }
    
        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={({name, gender}) => `${name} (${gender})`}/>
        )

        const itemDetails = (
            <ItemDetails
            itemId={this.state.selectedChar}
            getData={this.gotService.getCharacter} >
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        )

        return (
           <RowBlock left={itemList} right={itemDetails} />
        )
    }
}

// CharacterPage.defaultProps = {
//     onItemSelected: () => {}
// }

// CharacterPage.propTypes = {
//     onItemSelected: PropTypes.func,
//     //getData: PropTypes.arrayOf(PropTypes.object)
// }