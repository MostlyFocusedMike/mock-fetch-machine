import React from 'react'
import { render, fireEvent, cleanup, getByText, findByText, waitForElement, act } from '@testing-library/react';
import TestExample from '.';
import {setDefaultRoutes, overrideRoute, resetFetch, rejectRoute} from './fetchMachine';

describe('Fetch mock tests', () => {

    beforeEach(() => {
        setDefaultRoutes();
    });
    const setup = () => {
        // fetchMachine();
        const utils = render(<TestExample />);
        return {
            ...utils,
        };
    }

    afterEach(resetFetch)

    it('runs', async () => {
        const { getByText, debug, findByText} = setup();
        await waitForElement(() => getByText(/test 1/));
        expect(getByText('Hello test')).toBeTruthy();
    });

    it('runs and catches overrid', async () => {
        overrideRoute('TestAdapter', 'getOne', {msg: 'test 2 override'})
        const { getByText, debug } = setup();
        await waitForElement(() => getByText(/test 2 override/));
        expect(getByText('Hello test')).toBeTruthy();
        debug();
    });

    it('runs back with defaults', async () => {
        const { getByText, debug, findByText} = setup();
        await waitForElement(() => getByText(/test 1/));
        expect(getByText('Hello test')).toBeTruthy();
    });


    it('catches errors', async () => {
        rejectRoute('TestAdapter', 'getOne');
        const { getByText, debug } = setup();
        expect(getByText('Hello test')).toBeTruthy();
    });

    it('runs back with defaults again', async () => {
        const { getByText, debug, findByText} = setup();
        await waitForElement(() => getByText(/test 1/));
        expect(getByText('Hello test')).toBeTruthy();
    });

});
