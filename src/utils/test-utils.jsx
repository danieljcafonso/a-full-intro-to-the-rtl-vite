import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "../context/AuthContext";
import { SnackbarProvider } from "notistack";
import userEvent from "@testing-library/user-event";

export const dummyUserData = { username: "daniel", email: "daniel@admin.com" };

export const dummyCarList = {
  thisisacarid: {
    brand: "Audi",
    model: "Guinea",
    segment: "Van",
    price: 12000,
    fuel: "Diesel",
    photo:
      "https://as2.ftcdn.net/v2/jpg/00/16/14/89/1000_F_16148967_YvRk9vkq8eyVda5pDAeTRCvciG87ucqJ.jpg",
  },
};

export const dummyCarCreateData = {
  brand: "Audi",
  model: "Guinea",
  segment: "Van",
  price: "12000",
  fuel: "Diesel",
  photo:
    "https://as2.ftcdn.net/v2/jpg/00/16/14/89/1000_F_16148967_YvRk9vkq8eyVda5pDAeTRCvciG87ucqJ.jpg",
};

const customRender = (ui, { ...options } = {}) => {
  const queryClient = new QueryClient({
    logger: {
      log: console.log,
      warn: console.warn,
      error: process.env.NODE_ENV === "test" ? () => {} : console.error,
    },
    defaultOptions: {
      queries: {
        retry: 0,
        staleTime: Infinity,
      },
    },
  });

  const CombinedProviders = ({ children }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <AuthProvider>{children}</AuthProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    );
  };
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: CombinedProviders, ...options }),
  };
};

export * from "@testing-library/react";
export { customRender as render };
