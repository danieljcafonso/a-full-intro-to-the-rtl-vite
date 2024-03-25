import { render, screen, waitFor, dummyUserData } from "../../utils/test-utils";
import Header from "../Header";
import * as useLocalStorage from "../../hooks/useLocalStorage";
import { useNavigate, useLocation } from "react-router-dom";

const navigateMockFn = vi.fn();

const setLocalStorage = vi.fn();

describe("Header tests", () => {
  beforeEach(() => {
    navigateMockFn.mockClear();
    useLocalStorage.default = vi.fn(() => [null, setLocalStorage]);
    useNavigate.mockImplementation(() => navigateMockFn);
    useLocation.mockImplementation(() => ({ pathname: "/" }));
  });

  it("should render", () => {
    render(<Header />);

    const carsList = screen.getByRole("button", {
      name: /my cars/i,
    });
    const addCars = screen.getByRole("button", {
      name: /add cars/i,
    });
    const themeToggle = screen.getByRole("button", {
      name: /change theme/i,
    });

    expect(carsList).toBeInTheDocument();
    expect(addCars).toBeInTheDocument();
    expect(themeToggle).toBeInTheDocument();
  });

  it("should render logout button when authenticated", () => {
    useLocalStorage.default = vi.fn(() => [dummyUserData, setLocalStorage]);

    render(<Header />);
    const logoutButton = screen.getByLabelText(
      `Logout from ${dummyUserData.username}`
    );
    expect(logoutButton).toBeInTheDocument();
  });

  it("should logout on logout click", async () => {
    useLocalStorage.default = vi.fn(() => [dummyUserData, setLocalStorage]);

    const { user } = render(<Header />);
    const logoutButton = screen.getByLabelText(
      `Logout from ${dummyUserData.username}`
    );

    await user.click(logoutButton);
    await waitFor(() => expect(setLocalStorage).toHaveBeenCalledWith(null));
  });

  it("should redirect to login when unauthenticated and on homepage", async () => {
    render(<Header />);
    await waitFor(() => expect(navigateMockFn).toHaveBeenCalledWith("/login"));
  });

  it("shouldnt redirect to login when authenticated", async () => {
    useLocalStorage.default = vi.fn(() => [dummyUserData, setLocalStorage]);
    render(<Header />);
    await waitFor(() =>
      expect(navigateMockFn).not.toHaveBeenCalledWith("/login")
    );
  });

  it("shouldnt redirect to login when unauthenticated and on login page", async () => {
    useLocation.mockImplementation(() => ({ pathname: "/login" }));
    render(<Header />);
    await waitFor(() =>
      expect(navigateMockFn).not.toHaveBeenCalledWith("/login")
    );
  });

  it("shouldnt redirect to login when unauthenticated and on register page", async () => {
    useLocation.mockImplementation(() => ({ pathname: "/register" }));
    render(<Header />);
    await waitFor(() =>
      expect(navigateMockFn).not.toHaveBeenCalledWith("/login")
    );
  });

  it("should navigate to new page on nav item click", async () => {
    const { user } = render(<Header />);

    const carsList = screen.getByRole("button", {
      name: /my cars/i,
    });
    await user.click(carsList);
    expect(navigateMockFn).toHaveBeenCalledWith("/cars");
  });

  it("should have dark mode toggled on", () => {
    render(<Header isDarkMode={true} />);
    const darkModeButton = screen.getByTestId("dark_mode");
    expect(darkModeButton).toBeInTheDocument();
  });

  it("should have light mode toggled on", () => {
    render(<Header isDarkMode={false} />);
    const lightModeButton = screen.getByTestId("light_mode");
    expect(lightModeButton).toBeInTheDocument();
  });
});
