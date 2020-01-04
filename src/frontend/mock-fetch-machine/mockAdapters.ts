type urlTp = string;

interface mockReturnValueIntf {
    body: any;
    code?: number;
    method?: string;
}

type routeTuple = [
    urlTp,
    mockReturnValueIntf
]

interface MockAdaptersIntf {
    [ key: string ]: {
        [ key: string ]: routeTuple[];
    }
}

const mockAdapters: MockAdaptersIntf = {
    TestAdapter: {
        getOne: [
            ['/test/1', { body: { msg: 'test 1 val' } }],
            ['/test/2', { body: { msg: 'test 1 val' } }],
        ],
        create: [
            ['/test', { body: { msg: 'test 1 val' }, method: 'POST', code: 201 }],
        ],
    },
};

export default mockAdapters;
