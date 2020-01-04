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

const mockAdapters = {
    TestAdapter: {
        getOne: [
            ['/test/1', { body: { msg: 'test 1 val' } }],
        ],
    },
};

export default mockAdapters;
