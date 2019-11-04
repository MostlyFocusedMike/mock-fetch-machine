
interface MockAdaptersIntf {
    [ key: string ]: {
        [ key: string ]: {
            route: string;
            response: any;
            method?: string;
            status?: number;
        }
    }
}

const mockAdapters: MockAdaptersIntf = {
    TestAdapter: {
        getOne: {
            route: '/test/1',
            response: { msg: 'test 1 val' },
        },
    },
};

export default mockAdapters;
