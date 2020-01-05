import fetchMock from 'fetch-mock';
import rawMockAdapters from './mock_adapters';
import {
    RouteTupleType,      // eslint-disable-line no-unused-vars
    MockAdaptersIntf,    // eslint-disable-line no-unused-vars
    defaultOptsIntf,     // eslint-disable-line no-unused-vars
    mockReturnValueIntf, // eslint-disable-line no-unused-vars
} from './types';

class FetchMachine {
    mockAdapters: MockAdaptersIntf;
    defaultOpts: defaultOptsIntf;
    constructor(mockAdapters: MockAdaptersIntf) {
        this.mockAdapters = mockAdapters;
        this.defaultOpts = {
            status: 200,
            method: 'GET',
        };
    }

    /** place any fetch-mock configs in this method */
    private setConfigs = () => {
        fetchMock.config.overwriteRoutes = true; // only config that's *required*
    };

    private createRoutesFromTuples = (routeTuples: RouteTupleType[]) => {
        routeTuples.forEach(routeTuple => {
            const [url, mockReturnValue] = routeTuple;
            const { body, status, method } = {
                ...this.defaultOpts,
                ...mockReturnValue,
            };
            fetchMock.mock(url, { body, status }, { method });
        });
    };

    private setDefaultRoutes = () => {
        Object.values(rawMockAdapters).forEach(mockAdapter => {
            Object.values(mockAdapter).forEach(this.createRoutesFromTuples);
        });
    };

    /** Initialize fetch machine with configs and default routes */
    init = () => {
        this.setConfigs();
        this.setDefaultRoutes();
    };

    /** copy of jest-fetch-mock where the next fetch request, regardless of route, gets mocked */
    mockAnyOnce = (
        body: any,
        status = this.defaultOpts.status,
        method = this.defaultOpts.method,
    ) => {
        fetchMock.reset();
        fetchMock.once('*', { body, status }, { method });
    };

    /** Override a single adapter function for a single test */
    changeRoute = (
        mockAdapter: string,
        adapterFunction: string,
        newResponse: mockReturnValueIntf = {
            body: {},
            status: 200,
            method: 'GET',
        },
        routeIdx = 0,
    ) => {
        const [url, oldResponse] = rawMockAdapters[mockAdapter][adapterFunction][routeIdx];
        fetchMock.mock(
            url,
            {
                body: newResponse.body || oldResponse.body,
                status: newResponse.status || oldResponse.status,
            },
            {
                method: newResponse.method || oldResponse.method,
            },
        );
    };

    errorRoute = (
        mockAdapter: string,
        adapterFunction: string,
        error: any,
        routeIdx = 0,
    ) => {
        const [url, { method }] = rawMockAdapters[mockAdapter][adapterFunction][routeIdx];
        fetchMock.mock(
            url,
            {
                body: error,
                status: 400,
            },
            { method },
        );
    };

    /** Break a single route with an unhandled error */
    rejectRoute = (
        mockAdapter: string,
        adapterFunction: string,
        routeIdx = 0,
    ) => {
        const [url] = rawMockAdapters[mockAdapter][adapterFunction][routeIdx];
        fetchMock.mock(url, { throws: new TypeError('failed to fetch') });
    };

    reset = () => fetchMock.reset();
}

export default new FetchMachine(rawMockAdapters);
