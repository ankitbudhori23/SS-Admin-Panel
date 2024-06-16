import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import SearchBar from "../../components/Input/SearchBar";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import Model from "../../containers/Model";
import {Intern_Departments} from "../../utils/Data";
import DeleteIntern from "../../containers/DeleteIntern";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import {useNavigate} from "react-router-dom";

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");
  
  const showFiltersAndApply = (params) => {
    applyFilter(params);
    setFilterParam(params);
  };

  const removeAppliedFilter = () => {
    removeFilter();
    setFilterParam("");
    setSearchText("");
  };

  useEffect(() => {
    if (searchText === "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);

  return (
    <div className="">
      <SearchBar
        searchText={searchText}
        styleClass="mr-4 max-sm:block"
        setSearchText={setSearchText}
      />
      {filterParam !== "" && (
        <button
          onClick={() => removeAppliedFilter()}
          className="btn btn-sm mr-2 btn-active btn-ghost normal-case max-sm:mt-4 "
        >
          {filterParam}
          <XMarkIcon className="w-4 ml-2" />
        </button>
      )}
      <div className="dropdown dropdown-end max-sm:mt-4 max-sm:float-right">
        <label tabIndex={0} className="btn btn-sm btn-outline">
          <FunnelIcon className="w-5 mr-2" />
          Filter
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 text-sm shadow bg-base-200 rounded-box w-52 box-shadow-md "
        >
          {Intern_Departments.map((l, k) => {
            return (
              <li key={k}>
                <a onClick={() => showFiltersAndApply(l)}>{l}</a>
              </li>
            );
          })}
          <div className="divider mt-0 mb-0"></div>
          <li>
            <a onClick={() => removeAppliedFilter()}>Remove Filter</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

function InternsTable({ data,pop }) {

  const {currentUser} = useSelector((state)=>state.userdata);
  const [trans, setTrans] = useState(data);
  const [boxopen, setboxopne] = useState({});
  const [boxdelete,setDelete] =useState({});
const nav= useNavigate();
  const removeFilter = () => {
    setTrans(data);
  };

  const applyFilter = (params) => {
    let filteredTransactions = data.filter((t) => {
      return t.profile.toLowerCase() === params.toLowerCase();
    });
    setTrans(filteredTransactions);
  };

  const applySearch = (value) => {
    let filteredTransactions = data.filter((t) => {
      return t.fname.toLowerCase().includes(value.toLowerCase());
    });
    setTrans(filteredTransactions);
  };

  return (
    <>
      <TitleCard
        title={trans?.length}
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
            applySearch={applySearch}
            applyFilter={applyFilter}
            removeFilter={removeFilter}
          />
        }
      >

        <div className="overflow-x-auto w-full">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="cus-pos">Name</th>
                <th>Phone</th>
                <th>Profile</th>
                <th>{pop ? "Duration" : "Certificate" }</th>
                <th>{pop ? "Days left" : "LOR" }</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {trans?.map((l, k) => {
                  let pdate=new Date();
                  let futuredate = moment(l.ending_date);
                  let date=futuredate.diff(pdate, 'days')
                  if(date<=0)date=0;
                  else date=date+1;
                return (
                  <tr key={k}>
                   
                    <td className="font-bold capitalize">{l.fname}</td>
                    <td>{l.phone}</td>
                    <td>{l.profile}</td>
                    <td>{pop ? l.duration_month + " Month" : 
                    <span className={l.certificate_issued === 'NO' && "badge badge-error"}>{l.certificate_issued}</span>
                    }</td>
                    <td>
                      {
                        pop ? <span className={date===0 ? "badge badge-secondary" :" "}>{date} Days</span>
                        : <span className={l.LOR_issued === 'YES' ? "badge badge-success ": "badge badge-error"}>{l.LOR_issued}</span>
                      }
                      </td>
                    <td>
                      <button
                        className="btn btn-circle btn-ghost rounded-full"
                        onClick={() => setboxopne(l)}
                      >
                        <EyeIcon className="h-6 w-6" />
                      </button>
                      {pop &&  currentUser.leading_department === l.profile &&
                      <button
                        className="btn btn-circle btn-ghost rounded-full"
                        onClick={() => nav('/app/add-intern',{ state:l })}
                      >
                        <PencilIcon className="h-6 w-6" />
                      </button>
                      }

                      {date===0 && pop &&  currentUser.leading_department === l.profile &&
                      <button
                        className="btn btn-circle btn-ghost rounded-full"
                        onClick={() => setDelete(l)}
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
      {boxopen.id && <Model open={boxopen} close={setboxopne} />}
      {boxdelete.id && <DeleteIntern open={boxdelete} close={setDelete} />}
    </>
  );
}

export default InternsTable;
