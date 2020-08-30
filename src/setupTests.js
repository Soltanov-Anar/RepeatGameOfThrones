import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
require('jest-extended');

configure({adapter: new Adapter()});

const confiq = {
    "jest": {
        "setupTestFrameworkScriptFile": "jest-extended"
      }
}

export default confiq;