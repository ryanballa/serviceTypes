import * as React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import App from './App';

describe('<App>', () => {
    it('renders app', () => {
        const { getByText } = render(<App />);
        const mainElement = getByText(/Service Requests/i);
        expect(document.body.contains(mainElement));
    });
});