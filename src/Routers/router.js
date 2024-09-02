import Home from "../components/Home/Home";
import User from "../components/User/User";
import Admin from "../components/Admin/Admin";
import AdminDashboard from "../components/Admin/Content/AdminDashboard";
import ManageUsers from "../components/Admin/Content/ManageUsers";
import Login from "../components/Login/Login";
import Register from "../components/Login/Register";
import DetailQuiz from "../components/User/DetailQuiz";
import ManageQuiz from "../components/Admin/Content/ManageQuiz/ManageQuiz";
import ManageQuestion from "../components/Admin/Content/ManageQuestion/ManageQuestion";
export const routes = [
  {
    path: "/",
    element: <Home />,
    name: "Home",
  },
  {
    path: "/user",
    element: <User />,
    name: "User",
  },
  {
    path: "/admin",
    element: <Admin />,
    name: "Admin",
    children: [
      {
        path: "",
        element: <AdminDashboard />,
        name: "Dashboard",
      },
      {
        path: "manage_users",
        element: <ManageUsers />,
        name: "manage-users",
      },
      {
        path: "manage_quiz",
        element: <ManageQuiz />,
        name: "manage-quiz",
      },
      {
        path: "manage_question",
        element: <ManageQuestion />,
        name: "manage-question",
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    name: "Login",
  },
  {
    path: "/register",
    element: <Register />,
    name: "register",
  },
  {
    path: "/quiz/:id",
    element: <DetailQuiz />,
    name: "quiz",
  },
  {
    path: "*",
    element: <Home />,
    name: "error",
  },
];
