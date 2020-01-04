interface MockAdaptersIntf {
    [ key: string ]: {
        [ key: string ]: {
            route: string;
            response: any;
            method?: string;
            status?: number;
            errors: any;
        }
    }
}

const mockAdapters: MockAdaptersIntf = {
    TestAdapter: {
        getOne: {
            route: '/test/1',
            response: { msg: 'test 1 val' },
            errors: {
                404: {
                    message: 'Resource is missing',
                    title: 'Not Found',
                },
            },
        },
    },
};

export default mockAdapters;
