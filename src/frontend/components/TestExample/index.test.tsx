import React from 'react';
import {
    render,
    waitForElement,
} from '@testing-library/react';
import TestExample from '.';
import {
    setDefaultRoutes,
    overrideRoute,
    resetFetch,
    rejectRoute,
    mockOnce,
} from '../../mock-fetch-machine';

describe('Fetch mock tests', () => {
    beforeEach(() => {
        setDefaultRoutes();
    });

    afterEach(resetFetch);

    const setup = () => {
        const utils = render(<TestExample />);
        return {
            ...utils,
        };
    };

    it('runs', async () => {
        const { getByText } = setup();
        await waitForElement(() => getByText(/test 1/));
        expect(getByText('Hello test')).toBeTruthy();
    });

    it('runs and catches override', async () => {
        overrideRoute('TestAdapter', 'getOne', { msg: 'test 2 override' });
        const { getByText } = setup();
        await waitForElement(() => getByText(/test 2 override/));
        expect(getByText('Hello test')).toBeTruthy();
    });

    it('runs back with defaults', async () => {
        const { getByText } = setup();
        await waitForElement(() => getByText(/test 1/));
        expect(getByText('Hello test')).toBeTruthy();
    });


    it('catches errors', async () => {
        rejectRoute('TestAdapter', 'getOne');
        const { getByText } = setup();
        expect(getByText('Hello test')).toBeTruthy();
    });

    it('runs back with defaults again', async () => {
        const { getByText } = setup();
        await waitForElement(() => getByText(/test 1/));
        expect(getByText('Hello test')).toBeTruthy();
    });

    it('mocks once', async () => {
        mockOnce({ msg: 'oh wow' });
        const { getByText, debug } = setup();
        await waitForElement(() => getByText(/oh wow/));
        expect(getByText('Hello test')).toBeTruthy();
        debug();
    });
});
