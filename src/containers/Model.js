import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import moment from "moment";

export default function Model({ open, close }) {
  return (
      <div className={`modal ${open ? "modal-open" : ""}`}>
      <div className={`modal-box lg lg:ml-80`}>
        <button
          className="btn btn-ghost bg-base-300 btn-circle z-10 absolute right-0 top-0"
          onClick={() => close("")}
        >
          <XMarkIcon className="h-5 inline-block w-5" />
        </button>
        <div className="capitalize bg-base-300 p-3 rounded-lg text-center font-bold text-xl mb-5">
        {open.image && (
          <img
            className="m-auto h-32 w-32 mb-2 rounded-full ring-2 ring-white"
            src={`https://www.studifysuccess.com${open.image}`}
            alt="Avatar"
          />
        )}
          <div>{open.fname + " " + open.lname}</div>
        </div>

          <table className="text-left">
            <tr>
              <th>First Name -</th>
              <td>{open.fname}</td>
            </tr>
            <tr>
              <th>Last Name -</th>
              <td>{open.lname}</td>
            </tr>
            <tr>
              <th>Email -</th> 
              <td>{open.email}</td>
            </tr>
              <tr>
                <th>Phone -</th> 
                <td>{open.phone}</td>
              </tr>
              {open.duration &&<tr>
                <th>Duration -</th> 
              <td>{open.duration_month} Months</td>
              </tr>}
              {open.starting_date &&<tr>
                <th>Start -</th> 
                <td>{moment(`${open.starting_date}`).format('D-MMM-YYYY')}</td>
              </tr>}
              {open.ending_date &&<tr>
                <th>End -</th> 
                <td>{moment(`${open.ending_date}`).format('D-MMM-YYYY')}</td>
              </tr>}
              <tr>
                <th>Profile -</th> 
                <td>{open.profile}</td>
              </tr>
              {open.leading_department &&<tr>
                <th>Department -</th> 
                <td>{open.leading_department}</td>
              </tr>}
              {open.joining_date &&<tr>
                <th>Joining Date -</th> 
                <td>{open.joining_date}</td>
              </tr>}
              {open.leader &&<tr>
                <th>Leader -</th> 
                <td>{open.leader}</td>
              </tr>}
             <tr>
                <th>Education -</th> 
                <td>{open.education}</td>
              </tr>
              {open.last_active_date &&<tr>
                <th>Last Login -</th> 
                <td>{moment(`${open.last_active_date}`).format('D-MMM-YYYY')}</td>
              </tr>}
              {open.certificate_issued && <tr>
                <th>Certificate</th>
                <td>{open.certificate_issued}</td>
                </tr>}

                {open.LOR_issued && <tr>
                <th>LOR</th>
                <td>{open.LOR_issued}</td>
                </tr>}
            </table>
            {open.remark && 
        <div className="mt-2 bg-base-200 p-2 rounded-lg"><span className="font-bold w-24">Remark - </span>{open.remark}</div>
        }
        </div>
    </div>
  );
}
