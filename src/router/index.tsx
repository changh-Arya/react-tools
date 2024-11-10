import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import BackTopDemo from "../views/back-top/demo";
import HighlightDemo from "../views/hightlight/demo";
import { StateShare } from "../views/state-share";


export const routers = createBrowserRouter([
  {
    path: "/",
    id: "home",
    element: <Layout />,
    children: [
      {
        path: "/hightlight",
        id: "hightlight",
        element: <HighlightDemo />,
      },
      {
        path: "/backTop",
        id: "backTop",
        element: <BackTopDemo />,
      },
      {
        path: "/stateShare",
        id: "stateShare",
        element: <StateShare />,
      }
    ]
  },

]);
