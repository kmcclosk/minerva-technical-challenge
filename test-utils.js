import { render } from "@testing-library/react";
import { Providers } from './src/providers/Providers';

const AppProviders = ({ children }) => {
    return (
        <Providers>{children}</Providers>
    );
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: AppProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
