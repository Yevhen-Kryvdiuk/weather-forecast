import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
  beforeEach,
} from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from './test/handlers';
import { render, screen, userEvent, waitFor } from './test/testUtils';
import { App } from './App';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeEach(() => {
  localStorage.clear();
});

describe('App integration', () => {
  it('shows welcome state initially', () => {
    render(<App />);
    expect(
      screen.getByText(/search for a city to see the weather forecast/i),
    ).toBeInTheDocument();
  });

  it('searches and displays weather', async () => {
    render(<App />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter city name/i),
      'London',
    );
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText(/London, GB/i)).toBeInTheDocument();
    });
  });

  it('shows error for unknown city', async () => {
    render(<App />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter city name/i),
      'NotFoundCity',
    );
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  it('adds searched city to history', async () => {
    render(<App />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter city name/i),
      'London',
    );
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /search weather for london/i }),
      ).toBeInTheDocument();
    });
  });

  it('removes city from history and shows undo', async () => {
    render(<App />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter city name/i),
      'London',
    );
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /remove london/i }),
      ).toBeInTheDocument();
    });

    await userEvent.click(
      screen.getByRole('button', { name: /remove london/i }),
    );

    expect(screen.getByText(/removed from history/i)).toBeInTheDocument();
  });

  it('clicking history city triggers new search', async () => {
    render(<App />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter city name/i),
      'London',
    );
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText(/London, GB/i)).toBeInTheDocument();
    });

    await userEvent.click(
      screen.getByRole('button', { name: /search weather for london/i }),
    );

    await waitFor(() => {
      expect(screen.getByText(/London, GB/i)).toBeInTheDocument();
    });
  });
});
