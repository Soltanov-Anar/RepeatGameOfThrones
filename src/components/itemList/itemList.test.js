import React from 'react';
import ItemList from './itemList';
import {mount} from 'enzyme';
import GotService from '../../services/gotService';

describe ('Testing <ItemList />', () => {
    const service = new GotService();
    const list = mount(<ItemList 
                            getData={service.getAllHouses}
                            renderItem={({name}) => name } />)
    it ('Click on itemList must rerender all list in 1 instance', () => {
        list.setState({itemList: [{name: 'Ivan', id: 1}, {name: 'Igor', id: 2} ]});
        list.find('.list-group-item:first-child').simulate('click');
        expect(list.find('ul')).toHaveLength(1);
    });

});