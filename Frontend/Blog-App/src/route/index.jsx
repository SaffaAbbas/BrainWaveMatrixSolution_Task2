import { createBrowserRouter } from 'react-router-dom';
import Login from '../screens/Login';
import BlogForm from '../screens/BlogForm';
import SignUp from '../screens/SignUp';
import App from "../App.jsx";
import BlogPage from '../screens/BlogScreens/BlogPage.jsx';
import EditBlog from '../screens/BlogScreens/EditBlog.jsx';
import MyBlog from '../screens/BlogScreens/MyBlog.jsx';
import ReviewPage from '../screens/BlogScreens/ReviewPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'blog',
        element: <BlogForm />,
      },
      {
        path: 'editblog',
        element: <EditBlog />,
      },
      {
        path: 'blogPage',
        element: <BlogPage />,
      },
      {
        path: 'myBlog',
        element: <MyBlog />,
      },
      {
        path: 'review',
        element: <ReviewPage />,
      },
    ],
  },
]);

export default router;
