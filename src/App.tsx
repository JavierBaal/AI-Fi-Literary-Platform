import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/about"
            element={React.lazy(() => import("./pages/about"))}
          />
          <Route
            path="/library"
            element={React.lazy(() => import("./pages/library"))}
          />
          <Route
            path="/contribution/:id"
            element={React.lazy(() => import("./pages/contribution/[id]"))}
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
