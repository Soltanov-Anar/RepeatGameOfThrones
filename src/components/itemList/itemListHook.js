import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner';
// import ErrorMessage from '../errorMessage';
// import GotService from '../../services/gotService';

function ItemList({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);

    useEffect( () => {
        getData()
            .then( (data) => {
                updateList(data)
            })
            .catch('Error');
    }, [])


    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item); 

            return (
            <li 
                key={id}
                className="list-group-item"
                onClick={ () => onItemSelected(id)}>
                 {label}
            </li>
            )
        })
    }

    if(!itemList) {
        return <Spinner />
    }
    
    const items = renderItems(itemList);


        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    
}

export default ItemList;

// ItemList.defaultProps = {
//     onItemSelected: () => {}
// }



// const withData  = (View, getData) => {
//     return class extends Component {

//         state = {
//             data: null, 
//             error: false,
//             loading: true,
//         }
    
//         componentDidMount() {
    
//             getData()
//                 .then((data) => {
//                     this.setState({
//                         data,
//                         error: false,
//                     });
//                 })
//                 .catch( () => {this.onError()});
//         }
    
//         componentDidCatch() {
//             this.setState({
//                 data: null,
//                 error: true,
//             })
//         }
    
//         onError = () => {
//             this.setState({
//                 data: null,
//                 error: true,
//             })
//         }

//         render() {
//             const {data, error} = this.state;
        
//             if (error) {
//                 return <ErrorMessage />
//             }
    
//             if (!data) {
//                 return <Spinner />
//             }
//             return <View {...this.props} data={data} />
//         }
//     };
// }

// const {getAllCharacters} = new GotService();

// export default withData(ItemList, getAllCharacters);


// const f = (a) => {
//     console.log(a)
//     return (b) => {
//         console.log(a + b)
//     }
// }

// f(1)(2);