import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./Routers/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        {/* <Header /> */}
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.children?.map((childRoute, childIndex) => (
                <Route
                  key={childIndex}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
            </Route>
          ))}
        </Routes>
        <ToastContainer
          // hideProgressBar
          position="bottom-right"
          limit={3}
          autoClose={2000}
          closeOnClick
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
