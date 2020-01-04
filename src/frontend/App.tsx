import React from 'react';
import TestExample from './components/TestExample';

// export const MediumConverterContainer: React.FC<PropsItf> = (props) => {
const App: React.FC = () => {
    return (
        <div id='app'>
            <h1>Mock Fetch Machine</h1>
            <TestExample />
        </div>
    );
};

export default App;
