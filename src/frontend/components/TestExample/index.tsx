import React, { useEffect, useState } from 'react';

const TestAdapter = {
    getOne: () => {
        return fetch('/test/1').then(r => r.json());
    },
};

const TestExample: React.FC = () => {
    const [test1, setTest1] = useState<{msg: string} | null>(null);
    useEffect(() => {
        TestAdapter.getOne()
            .then(setTest1)
            .catch((e) => {
                console.log('Error handled');
            });
    }, []);

    return (
        <>
            <h1>Hello test</h1>
            <h2>{test1 && test1.msg}</h2>
        </>
    );
};

export default TestExample;
