import * as React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import ServiceRequestAdd from './ServiceRequestAdd';
import {
    BrowserRouter as Router,
} from "react-router-dom";

describe('<ServiceRequestAdd>', () => {
    it('renders sevice request add page loading state', () => {
        const { getByText } = render(<ServiceRequestAdd />);
        const mainElement = getByText(/Loading.../i);
        expect(document.body.contains(mainElement));
    });
    it('renders sevice request options', async () => {
        const { getByText } = await render(<Router><ServiceRequestAdd /></Router>);
        const mainElement = getByText(/Test/i);
        expect(document.body.contains(mainElement));
    });
});