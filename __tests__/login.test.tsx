import { render, screen, fireEvent, waitFor } from '../test-utils';
import Login from '../src/pages/login';

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    });
  },
}));

describe('Login', () => {

    it('renders username and password inputs and log in button', () => {

        render(<Login />);

        const username = screen.getByLabelText('Username');
        const password = screen.getByLabelText('Password');
        const loginButton = screen.getByText('Log in');

        expect(username).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    it('shows an error if username is empty when logging in', async () => {

        render(<Login />);

        const loginButton = screen.getByText('Log in');

        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(screen.getByLabelText('Username')).toBeInvalid();
            expect(screen.getByText('Username is required')).toBeInTheDocument();
        });
    });

})
