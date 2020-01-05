import { MockAdaptersIntf } from './types'; // eslint-disable-line no-unused-vars

const mockAdapters: MockAdaptersIntf = {
    TestAdapter: {
        getOne: [
            ['/test/1', { body: { msg: 'test 1 val' } }],
            ['/test/2', { body: { msg: 'test 1 val' } }],
        ],
        create: [
            ['/test', { body: { msg: 'test 1 val' }, method: 'POST', status: 201 }],
        ],
    },
};

export default mockAdapters;
