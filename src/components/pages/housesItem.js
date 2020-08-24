import React, {Component} from 'react';
import GotService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails';

export default class HousesItem extends Component {

    gotService = new GotService();

    render () {

        const {houseId} = this.props;
        const {getHouse} = this.gotService;

        return (
            <ItemDetails
            itemId={houseId}
            getData={getHouse} >
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='ancestralWeapons' label='Ancestral Weapons'/>
            </ItemDetails>
        )
    }
}