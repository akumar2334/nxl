import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import "./index.css";

// Lazy loaded pages (code splitting)
const Home = lazy(() => import("./pages/Home"));
const Analytics = lazy(() => import("./pages/Analytics"));
const KnowledgeBase = lazy(() => import("./pages/KnowledgeBase"));
const MarketingEvents = lazy(() => import("./pages/MarketingEvents"));

// Simple loader (can upgrade later to skeleton)
const PageLoader = () => (
  <div className="flex items-center justify-center h-[60vh] text-sm text-gray-500">
    Loading...
  </div>
);

// Route config (scalable)
const routes = [
  { path: "/", element: <Home /> },
  { path: "/analytics", element: <Analytics /> },
  { path: "/knowledge-base", element: <KnowledgeBase /> },
  { path: "/marketing-events", element: <MarketingEvents /> },
];

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<DashboardLayout />}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
}