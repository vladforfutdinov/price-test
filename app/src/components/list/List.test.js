import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import List from './List';

const names = ['first', 'second', 'third'];

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

test('renders list', () => {
  renderWithRouter(<List names={names} />);

  const firstElement = screen.getByText(/first/i);
  expect(firstElement).toBeInTheDocument();
});
