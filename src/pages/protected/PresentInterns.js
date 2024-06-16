import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import InternsTable from "../../features/InternsTable";
import axios from "axios";
import { setuser } from "../../features/common/presentInternSlice";
import {Link} from "react-router-dom";

function PresentInterns() {
  const dispatch = useDispatch();
  const { userdata } = useSelector((state) => state.presentInterns);
  const { currentUser } = useSelector((state) => state.userdata);

  useEffect(() => {
    dispatch(setPageTitle({ title: "Present Interns" }));
    userdata?.length === 0 &&
      axios
        .get(`${process.env.REACT_APP_API}/interns`)
        .then((res) => dispatch(setuser(res.data.data)))
        .catch((err) => {
          dispatch(setuser(err.response.data.err))
          // console.log(err.response.data.err)
        });
  }, [dispatch, userdata]);
  
  return (
    <>
      {userdata?.length === 0 ? (
        <div className="btn btn-accent loading" />
      ) : (
        <>
        {currentUser?.admin === 1  && <Link to="/app/add-intern" className="btn btn-accent btn-sm float-right mb-3 -mt-5">Add new intern</Link>}
        {userdata === 'NULL' ? <div className="p-5 text-xl mt-10 text-center rounded-2xl bg-base-300">No Data Found!</div> :
        <InternsTable data={userdata} pop={true} />
        }
        </>
      )}
    </>
  );
}

export default PresentInterns;
