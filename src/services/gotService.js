export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    getResourse = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url},
                             status ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = async () => {
        const res = await this.getResourse('/characters?page=10&pageSize=10');
        return res.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const character = await this.getResourse(`/characters/${id}`);
        return this._transformCharacter(character);  
    }

    getAllHouses = async () => {
        const res = await this.getResourse('/houses?page=10&pageSize=10');
        return res.map(this._transformHouse);
    }

    getHouse = async (id) => {
        const house = await this.getResourse(`/houses/${id}`);     
        return this._transformHouse(house);
    }

    getAllBooks = async () => {
        const books = await this.getResourse('/books?page=10&pageSize=10');
        return books.map(this._transformBooks);
    }

    getBooks = async (id) => {
        const book = await this.getResourse(`/books/${id}`);     
        return this._transformBooks(book);
    }

    _transformCharacter = (char) => {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformHouse = (houses) => {
        return {
            name: houses.name,
            region: houses.region,
            words: houses.words,
            titles: houses.titles,
            seats: houses.seats,
        }
    }

    _transformBooks = (book) => {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }
}

/* const got = new GotService();

got.getAllCharacters()
    .then(res => res.forEach( item => console.log(item.name))) 
    .catch(error => console.error(error));

got.getCharacter(119)
    .then(res => console.log(res))
    .catch(error => console.error(error)); */
