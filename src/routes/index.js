// All components mapping with path for internal routes

import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Page404 = lazy(() => import("../pages/protected/404"));
const Blank = lazy(() => import("../pages/protected/Blank"));
const Charts = lazy(() => import("../pages/protected/Charts"));
const Calendar = lazy(() => import("../pages/protected/Calendar"));
const Team = lazy(() => import("../pages/protected/Team"));
const PresentInterns = lazy(() => import("../pages/protected/PresentInterns"));
const PastInterns = lazy(() => import("../pages/protected/PastInterns"));
const TerminatedInterns = lazy(
  () => import("../pages/protected/TerminatedInterns"),
);
const AddIntern = lazy(() => import("../pages/protected/AddIntern"));
const ProfileSettings = lazy(
  () => import("../pages/protected/ProfileSettings"),
);
const AddQuiz = lazy(() => import("../pages/Quiz/AddQuiz"));
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/team",
    component: Team,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "/interns",
    component: PresentInterns,
  },
  {
    path: "/past-interns",
    component: PastInterns,
  },
  {
    path: "/terminated-interns",
    component: TerminatedInterns,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/add-intern",
    component: AddIntern,
  },
  {
    path: "/blank",
    component: Blank,
  },
  {
    path: "/add-quiz",
    component: AddQuiz,
  },
];

export default routes;
