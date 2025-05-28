import { Suspense } from "react";
import "./App.css";

import { Loader } from "@/components/shared/Loader";
import { Routes } from "@/components/shared/Routes/Routes";
import { ThemeProvider } from "@/components/shared/layout/ThemeProvider/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Suspense fallback={<Loader />}>
          <Routes />
        </Suspense>

        <ToastContainer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
