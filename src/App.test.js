import { render, screen } from '@testing-library/react';
import App from './App';

test('quiz 15 soru içermeli', () => {
  render(<App />);
  const questions = screen.getAllByTestId('question');
  expect(questions).toHaveLength(15);
});
