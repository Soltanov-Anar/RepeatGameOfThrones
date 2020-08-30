import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
    const [count, setCount] = useState(0);
    const [data, refreshData] = useState([{
        name: 'Ivan', 
        gender: 'male'
    }]);

    useEffect( () => {
        updateChar();
        let timerId = setInterval(updateChar, interval);
        return () => {
            clearInterval(timerId);
        }
    });


    return (
        <div>
            <p>Вы кликнули {count} раз</p>
            <button
            onClick={() => setCount(count + 1)}>
                Кликни меня
            </button>
            {data.map(item => {
                return (
                    <div> 
                        Name: {item.name}, gender: {item.gender}
                    </div>

                );
            })}
            <button
            onClick={() => refreshData(data => ([...data, {name: 'Alex', gender: 'male'}]))}>
                Добавить данные
            </button>
        </div>
    )
}

export default App;