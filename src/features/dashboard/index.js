import DashboardStats from "./components/DashboardStats";
import { useEffect } from "react";
import AmountStats from "./components/AmountStats";
import PageStats from "./components/PageStats";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UserPlusIcon from "@heroicons/react/24/outline/UserPlusIcon";
import UserMinusIcon from "@heroicons/react/24/outline/UserMinusIcon";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import UserChannels from "./components/UserChannels";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../common/headerSlice";
import DoughnutChart from "./components/DoughnutChart";
import axios from "axios";
import { setTotalMembers } from "../common/headerSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const { TotalMembers } = useSelector((state) => state.header);

  useEffect(() => {
    TotalMembers?.length === 0 &&
      axios
        .get(`${process.env.REACT_APP_API}/interns/count`)
        .then((res) => {
          const { leaders, interns, pinterns, tinterns } = res.data.data[0];
          dispatch(setTotalMembers([leaders, interns, pinterns, tinterns]));
        })
        .catch((err) => console.log("Dashboard", err.response.data));
  }, [dispatch, TotalMembers]);

  const statsData = [
    {
      title: "Team Members",
      value: TotalMembers[0],
      icon: <UserGroupIcon className="w-8 h-8" />,
      link: "/app/team",
    },
    {
      title: "Present Interns",
      value: TotalMembers[1],
      icon: <UserPlusIcon className="w-8 h-8" />,
      link: "/app/interns",
    },
    {
      title: "Past Interns",
      value: TotalMembers[2],
      icon: <UserMinusIcon className="w-8 h-8" />,
      link: "/app/past-interns",
    },
    {
      title: "Terminated Interns",
      value: TotalMembers[3],
      icon: <ExclamationCircleIcon className="w-8 h-8" />,
      link: "/app/terminated-interns",
    },
  ];

  return (
    <>
      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>

      {/** ---------------------- Different charts ------------------------- */}
      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <LineChart />
        {/* <BarChart /> */}
      </div>

      {/** ---------------------- Different stats content 2 ------------------------- */}

      {/* <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
        <AmountStats />
        <PageStats />
      </div> */}
    </>
  );
}

export default Dashboard;
