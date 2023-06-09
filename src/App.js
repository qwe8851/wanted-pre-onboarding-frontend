import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from './pages/Root';
import HomePage from './pages/Home'
import ErrorPage from './pages/Error';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Todo from './components/Todo';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/signin', element: <SignIn /> },
      { path: '/todo', element: <Todo /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;