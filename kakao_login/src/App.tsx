import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Kakao from "./screens/Kakao";
import NotFound from "./screens/Notfound";
import SNSLogin from "./screens/SNS";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <NotFound />,
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "login",
                children: [
                    {
                        path: "kakao",
                        element: <Kakao />,
                    },
                    {
                        path: "naver",
                        element: <SNSLogin />,
                    },
                ],
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
