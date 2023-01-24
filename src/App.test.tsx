import { render, screen } from '@testing-library/react';
import App from './App';

test('renders next button', () => {
  render(<App />);
  const linkElement = screen.getByText(/next/i);
  expect(linkElement).toBeInTheDocument();
});
