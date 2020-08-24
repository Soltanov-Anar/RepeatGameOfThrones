import React, {Component} from 'react';
import GotService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails';

export default class BooksItem extends Component {
    gotService = new GotService();
    
    render () {
        const {bookId} = this.props;
        const {getBook} = this.gotService;
        return (
            <ItemDetails itemId={bookId} getData={getBook}>
                <Field field='numberOfPages' label='Number of pages'/>
                <Field field='publisher' label='Publisher' />
                <Field field='released' label='Released' />
            </ItemDetails>
        )
    };
}
