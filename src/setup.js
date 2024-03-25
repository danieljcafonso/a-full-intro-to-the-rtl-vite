import "@testing-library/jest-dom/vitest";
import * as useLocalStorage from "./hooks/useLocalStorage";
import { dummyUserData } from "./utils/test-utils";
import { server } from "./mocks/server";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));

const useLocalStorageOriginalImplementation = useLocalStorage.default;

beforeEach(() => {
  useLocalStorage.default = vi.fn(() => [dummyUserData, vi.fn()]);
});
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => {
  useLocalStorage.default = useLocalStorageOriginalImplementation;
  server.close();
});
afterEach(() => server.resetHandlers());

const errorLog = console.error;
console.error = (error) => {
  if (
    !error.includes("for a non-boolean attribute") &&
    !error.includes("validateDOMNesting") &&
    !error.includes("Not implemented: HTMLFormElement.prototype.submit")
  )
    errorLog(error);
};
