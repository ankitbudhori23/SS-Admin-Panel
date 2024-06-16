/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import UserPlusIcon from "@heroicons/react/24/outline/UserPlusIcon";
import UserMinusIcon from "@heroicons/react/24/outline/UserMinusIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "/app/team", // url
    icon: <UsersIcon className={submenuIconClasses} />, // icon component
    name: "Team Members", // name that appear in Sidebar
  },
  {
    path: "/app/interns", // url
    icon: <UserPlusIcon className={iconClasses} />, // icon component
    name: "Present Interns", // name that appear in Sidebar
  },
  {
    path: "/app/past-interns", // url
    icon: <UserMinusIcon className={iconClasses} />, // icon component
    name: "Past Interns", // name that appear in Sidebar
  },
  {
    path: "/app/terminated-interns", // url
    icon: <ExclamationCircleIcon className={iconClasses} />, // icon component
    name: "Terminated Interns", // name that appear in Sidebar
  },
  {
    path: "/app/add-quiz", // url
    icon: <ExclamationCircleIcon className={iconClasses} />, // icon component
    name: "Add Quiz", // name that appear in Sidebar
  },
  // {
  //   path: "/app/charts", // url
  //   icon: <ChartBarIcon className={iconClasses} />, // icon component
  //   name: "Analytics", // name that appear in Sidebar
  // },
  // {
  //   path: "/app/calendar", // url
  //   icon: <CalendarDaysIcon className={iconClasses} />, // icon component
  //   name: "Calendar", // name that appear in Sidebar
  // },
];

export default routes;
