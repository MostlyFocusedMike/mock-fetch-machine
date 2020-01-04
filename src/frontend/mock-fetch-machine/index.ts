import fetchMock from 'fetch-mock';
import rawMockAdapters from './mock_adapters';
import {
    RouteTupleType,      // eslint-disable-line no-unused-vars
    MockAdaptersIntf, // eslint-disable-line no-unused-vars
    defaultOptsIntf,  // eslint-disable-line no-unused-vars
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

    /**
    * copy of jest-fetch-mock where the next fetch request, regardless of route, gets mocked
    * @param body - response value
    * @param status - new server status code
    * @param method - http verb
    */
    mockAnyOnce = (
        body: any,
        status = this.defaultOpts.status,
        method = this.defaultOpts.method,
    ) => {
        fetchMock.reset();
        fetchMock.once('*', { body, status }, { method });
    };

    reset = () => fetchMock.reset();
}

// /**
//  * Mock literally any route but only once
//  *
//  * @param newResponse - overide response value
//  * @param status - new server status code
//  * @param method - http verb
//  */
// export const mockOnce = (
//     newResponse: any,
//     status = defaultOpts.status,
//     method = defaultOpts.method,
// ) => {
//     fetchMock.reset();
//     fetchMock.once('*', { body: newResponse, status }, { method });
// };

// /**
//  * Override a single adapter function for a single test
//  *
//  * @param mockAdapter -Name of the fake adapter
//  * @param adapterFunction - Name of the method to override
//  * @param newResponse - overide response value
//  * @param status - new server status code
//  * @param method - http verb
//  */
// export const overrideRoute = (
//     mockAdapter: string,
//     adapterFunction: string,
//     newResponse: any,
//     status = defaultOpts.status,
//     method = defaultOpts.method,
// ) => {
//     const { route } = rawMockAdapters[mockAdapter][adapterFunction];
//     fetchMock.mock(route, { body: newResponse, status }, { method });
// };

// /**
//  * Break a single route with an unhandled error,
//  * will break render test if app doesn't handle rejected promises
//  *
//  * @param mockAdapter - Name of the adapter
//  * @param adapterFunction - Name of the function
//  */
// export const rejectRoute = (
//     mockAdapter: string,
//     adapterFunction: string,
//     routeNumber = 0,
// ) => {
//     const { routes } = rawMockAdapters[mockAdapter][adapterFunction];
//     fetchMock.mock(routes, { throws: new TypeError('failed to fetch') });
// };

export default new FetchMachine(rawMockAdapters);
