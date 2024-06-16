import moment from "moment";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { setuser } from "../../../features/common/leaderSlice";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import Model from "../../../containers/Model";

function Team() {
  const dispatch = useDispatch();
  const { userdata } = useSelector((state) => state.leaderdata);
  const [boxopen, setboxopne] = useState({});

  useEffect(() => {
    userdata?.length === 0 &&
      axios
        .get(`${process.env.REACT_APP_API}/leaders`)
        .then((res) => dispatch(setuser(res.data.data)))
        .catch((err) => console.log(err.response.data));
  }, [dispatch, userdata]);

  return (
    <>
      <TitleCard title="Active Members" topMargin="mt-2">
        {/* Team Member list in table format loaded constant */}
        {userdata?.length === 0 ? (
          <div className="btn btn-accent loading" />
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="cus-pos">Img</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Profile</th>
                  <th>Department</th>
                  <th>Last Login</th>
                  <th>View More</th>
                </tr>
              </thead>
              <tbody>
                {userdata?.map((l, k) => {
                  return (
                    <tr key={k}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-circle w-12 h-12">
                              <img
                                src={`https://www.studifysuccess.com${l.image}`}
                                alt="img"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-bold">{l.fname}</td>
                      <td>{l.phone}</td>
                      <td>{l.profile}</td>
                      <td>{l.leading_department}</td>
                      <td>{moment(`${l.last_active_date}`).fromNow()}</td>
                      <td>
                      <button
                        className="btn btn-circle btn-ghost rounded-full"
                        onClick={() => setboxopne(l)}
                      >
                        <EyeIcon className="h-6 w-6" />
                      </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </TitleCard>
      {boxopen.id && <Model open={boxopen} close={setboxopne} />}
    </>
  );
}

export default Team;
