import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useState } from "react";
import InputText from "../components/Input/InputText";
import SelectBox from "../components/Input/SelectBox";
import ErrorText from "../components/Typography/ErrorText";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showNotification } from "../features/common/headerSlice";
import { removeuser } from "../features/common/presentInternSlice";
import { removeuser as pastr } from "../features/common/pastInternSlice";

export default function DeleteIntern({ open, close }) {
    const dispatch=useDispatch();
    const choice =["YES","NO"];
    const [form,setForm] =useState({
      certificate:"",
      lor:"",
      remarks:""
    })
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const updateFormValue = ({ updateType, value }) => {
      setErrorMessage("");
      setForm({ ...form, [updateType]: value });
    };
    
    const deleteUser= async()=>{
      if (form.certificate.trim() === "" || form.lor.trim() === "" || form.remarks.trim() === "")
      return setErrorMessage("All fields is required!");
      
      setLoading(true);
        await axios
        .post(`${process.env.REACT_APP_API}/interns/${open.id}`, {
         ...form
        })
        .then((res) => {
          dispatch(showNotification({ message: res.data.msg, status: 1 }));
          dispatch(removeuser());
          dispatch(pastr());
          close("");
        })
        .catch((err) => {
          setErrorMessage(err.response.data.error);
        });
        setLoading(false);
    }

  return (
    <div className={`modal ${open ? "modal-open" : ""}`}>
      <div className={`modal-box lg:ml-80`}>
        <button
          className="btn btn-ghost bg-base-300 btn-circle z-10 absolute right-0 top-0"
          onClick={() => close("")}
        >
          <XMarkIcon className="h-5 inline-block w-5" />
        </button>
        <div className="bg-base-300 text-xl capitalize text-center p-3 rounded-lg mb-2">
        {open.fname + " "+ open.lname}
        </div>
        <div className="text-xs text-error">After deleting this record it moves to past interns section.</div>
        <div className="text-xs text-error">NOTE:- This changes can't be reversed.</div>
        <div className="mt-3">
        <div className="flex space-x-3">
           <SelectBox
                labelTitle="Certificate issued ?"
                options={choice}
                defaultValue={form.certificate} 
                updateFormValue={updateFormValue}
                updateType="certificate"
                containerStyle="mt-2"
                />
            <SelectBox
                labelTitle="LOR issued ?"
                options={choice}
                defaultValue={form.lor} 
                updateFormValue={updateFormValue}
                updateType="lor"
                containerStyle="mt-2"
                />
         </div>
              <InputText
                  type="text"
                  defaultValue={form.remarks}
                  updateType="remarks"
                  containerStyle="mt-2"
                  labelTitle="Remark"
                  updateFormValue={updateFormValue}
                />
                  <ErrorText styleClass="mt-2 font-medium">
                {errorMessage}
              </ErrorText>
           <button onClick={deleteUser} 
          className={
            "btn mt-5 w-full btn-error text-primary-content" + (loading ? " loading" : "")
          }
           >
            {!loading && "Delete"}
            </button>
        </div>
      </div>
    </div>
  );
}
