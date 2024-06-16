import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import InternsTable from "../../features/InternsTable";
import { setuser } from "../../features/common/pastInternSlice";
import axios from "axios";

function PastInterns() {
  const dispatch = useDispatch();
  const { userdata } = useSelector((state) => state.pastInterns);

  useEffect(() => {
    dispatch(setPageTitle({ title: "Past Interns" }));
    userdata?.length === 0 &&
      axios
        .get(`${process.env.REACT_APP_API}/pinterns`)
        .then((res) => dispatch(setuser(res.data.data)))
        .catch((err) => err);
  }, [dispatch, userdata]);

  return (
    <>
      { userdata?.length === 0 ? (
        <div className="btn btn-accent loading" />
      ) : (
        <InternsTable data={userdata} pop={false}/>
      )}
    </>
  );
}

export default PastInterns;
