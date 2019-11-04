import mockAdapters from './mockAdapters';
const fetchMock = require('fetch-mock');


const defaultOpts = {
    status: 200,
    method: 'GET',
};

const initFetchMachine = () => {
    fetchMock.config.overwriteRoutes = true;
}

export const setDefaultRoutes = () => {
    initFetchMachine();
    Object.values(mockAdapters).forEach(mockAdapter => {
        Object.values(mockAdapter).forEach((properties) => {
            const { route, response, method, status } = {...defaultOpts, ...properties}
            fetchMock.mock(route, {body: response, status}, { method }); // success
        })
    })
};

export const overrideRoute = (
    mockAdapter: string,
    adapterFunction: string,
    newResponse: any,
    status = defaultOpts.status,
    method = defaultOpts.method,
) => {
    const route = mockAdapters[mockAdapter][adapterFunction].route;
    fetchMock.mock(route, {body: newResponse, status}, { method });
}

export const rejectRoute = (
    mockAdapter: string,
    adapterFunction: string,
) => {
    const route = mockAdapters[mockAdapter][adapterFunction].route;
    fetchMock.mock(route, {throws: new TypeError('failed to fetch')});
}

export const resetFetch = () => fetchMock.resetBehavior();
