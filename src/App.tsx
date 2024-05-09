import { ThemeProvider } from "@mui/material";
import { themeConfig } from "./config/themeConfig";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageLayout from "./pages/PageLayout";
import SelfTodolist from "./components/SelfTodolist/SelfTodolist";

interface IROUTE {
  path: string;
  component: JSX.Element;
}

const ROUTES: IROUTE[] = [
  {
    path: "/todos",
    component: <SelfTodolist />,
  },
];

function App() {
  return (
    <ThemeProvider theme={themeConfig}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route key="redirect" path="*" element={<Navigate to="/todos" replace />} />
            <Route key="rootRedirect" path="/" element={<Navigate to="/todos" replace />} />
            {ROUTES.map((r) => (
              <Route key={r.path} path={r.path} element={r.component} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
