import React, { useEffect, useState } from 'react';

const TestAdapter = {
    getOne: () => {
        return fetch('/test/1')
            .then(r => {
                if (r.ok) return r.json();
                return { msg: 'Error handled properly' };
            })
            .catch(e => {
                console.log(e);
                return { msg: 'Reject has been caught' };
            });
    },
};

const TestExample: React.FC = () => {
    const [test1, setTest1] = useState<{msg: string} | null>(null);
    useEffect(() => {
        TestAdapter.getOne()
            .then(res => {
                console.log('res: ', res);
                setTest1(res);
            })
            .catch((e) => {
                console.log('Error handled');
                setTest1({ msg: 'error ok' });
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
