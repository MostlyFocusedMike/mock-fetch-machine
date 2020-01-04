import React from 'react';
import {
    render,
    waitForElement,
} from '@testing-library/react';
import TestExample from '.';
import FetchMachine from '../../mock-fetch-machine';

describe('Fetch mock tests', () => {
    beforeEach(() => {
        FetchMachine.init();
    });

    afterEach(FetchMachine.reset);

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
        FetchMachine.changeRoute('TestAdapter', 'getOne', { body: { msg: 'test 2 override' } });
        const { getByText } = setup();
        await waitForElement(() => getByText(/test 2 override/));
        expect(getByText('Hello test')).toBeTruthy();
    });

    it('runs back with defaults', async () => {
        const { getByText } = setup();
        await waitForElement(() => getByText(/test 1/));
        expect(getByText('Hello test')).toBeTruthy();
    });

    it('mocks once', async () => {
        FetchMachine.mockAnyOnce({ msg: 'oh wow' });
        const { getByText, debug } = setup();
        await waitForElement(() => getByText(/oh wow/));
        expect(getByText('Hello test')).toBeTruthy();
        debug();
    });

    it('runs back with defaults', async () => {
        const { getByText } = setup();
        await waitForElement(() => getByText(/test 1/));
        expect(getByText('Hello test')).toBeTruthy();
    });

    it('catches errors', async () => {
        FetchMachine.rejectRoute('TestAdapter', 'getOne');
        const { getByText } = setup();
        expect(getByText('Hello test')).toBeTruthy();
    });
});
