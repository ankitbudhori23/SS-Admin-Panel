import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import InternsTable from "../../features/InternsTable";
import { setuser } from "../../features/common/pastInternSlice";
import axios from "axios";

function TerminatedInterns() {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const { userdata } = useSelector((state) => state.pastInterns);

  useEffect(() => {
    dispatch(setPageTitle({ title: "Past Interns" }));
    // userdata?.length === 0 &&
    axios
      .get(`https://97zr58-3000.csb.app/api/course/curriculum/1`)
      .then((res) => {
        // dispatch(setuser(res.data.data))
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [dispatch, userdata]);

  return (
    <>
      {/* { userdata?.length === 0 ? ( 
        <div className="btn btn-accent loading" />
      ) : (
        <InternsTable data={userdata} pop={false}/>
      )} */}
      Terminated Interns
      {data?.map((item) => {
        return (
          <>
            <div>{item.section_title}</div>
            <div>
              {JSON.parse(item.lectures).map((item) => (
                <div>{item}</div>
              ))}
            </div>
          </>
        );
      })}
    </>
  );
}

export default TerminatedInterns;
