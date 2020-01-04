import fetchMock from 'fetch-mock';
import mockAdapters from './mockAdapters';

const defaultOpts = {
    code: 200,
    method: 'GET',
};

// place any fetch-mock configs in this method
const initFetchMachine = () => {
    fetchMock.config.overwriteRoutes = true;
};

/**
 * Run through and register all the routes from the mock adapters
 */
export const setDefaultRoutes = () => {
    initFetchMachine();
    Object.values(mockAdapters).forEach(mockAdapter => {
        Object.values(mockAdapter).forEach((methodRoutes) => {
            methodRoutes.forEach(routeTuple => {
                const [url, mockReturnValue] = routeTuple;
                const { body, code, method } = {
                    ...defaultOpts,
                    ...mockReturnValue,
                };
                fetchMock.mock(url, { body, status: code }, { method });
            });
        });
    });
};

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
//     const { route } = mockAdapters[mockAdapter][adapterFunction];
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
//     const { routes } = mockAdapters[mockAdapter][adapterFunction];
//     fetchMock.mock(routes, { throws: new TypeError('failed to fetch') });
// };

// reset fetch to default behavior
export const resetFetch = () => fetchMock.reset();
