import { render, screen } from '@testing-library/react';
import { Row, Tables } from './Prices';

test('renders row', () => {
  const { container } = render(<Row title="Title" value={5} Tag="h1" />);

  const titleElement = screen.getByText(/title/i);
  expect(titleElement).toBeInTheDocument();

  const valueElement = screen.getByText(/5/i);
  expect(valueElement).toBeInTheDocument();

  const heading = container.querySelector('h1');
  expect(heading).toBeInTheDocument();
});

test('renders table where title corresponds to value', () => {
  const prices = [1, 2, 3, 4];
  const titles = ['Current', 'Day', 'Month', 'Year'];
  render(<Tables prices={prices} />);

  prices.forEach((_, i) => {
    const valueElement = screen.getByText(new RegExp(prices[i], 'i'));
    const titleElement = screen.getByText(new RegExp(titles[i], 'i'));

    const valueRowElement = valueElement.parentNode;
    const titleRowElement = titleElement.parentNode;

    expect(valueRowElement).toBe(titleRowElement);
  });
});
