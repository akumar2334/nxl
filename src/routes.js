import { createBrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import App from "./App";

// Layout wrapper
const Layout = () => {
  return (
    <App>
      <Sidebar />
      {/* <MainContent /> */}
    </App>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
]);

export default router;