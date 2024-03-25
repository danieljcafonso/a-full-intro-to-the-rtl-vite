import Header from "./components/Header";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useLocalStorage from "./hooks/useLocalStorage";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./context/AuthContext";

const queryClient = new QueryClient();

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});
const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", true);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <SnackbarProvider
            anchorOrigin={{ horizontal: "right", vertical: "botton" }}
          >
            <CssBaseline />
            <Header
              isDarkMode={isDarkMode}
              themeToggle={() => setIsDarkMode(!isDarkMode)}
            />
            <Outlet />
          </SnackbarProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
