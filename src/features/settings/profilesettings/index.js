import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import axios from "axios";

function ProfileSettings() {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state=>state.userdata);
  const [loading,setLoading]=useState(false);
  const INIT_STATE ={
    curpassword:"",
    password:"",
    npassword:"",
  }
  const [form,setForm]=useState(INIT_STATE)
  const [errorMessage, setErrorMessage] = useState("");

  const updateProfile = async () => {
    if(form.curpassword.trim()==="")return setErrorMessage("Current password is required!")
    if(form.password.trim()==="")return setErrorMessage("Password is required!");
    if(form.npassword.trim()==="")return setErrorMessage("Confirm password is required!");
    if(form.password.trim()!==form.npassword.trim())return setErrorMessage("Password & confirm password are not matching!");
    setLoading(true);
    await axios.patch(`${process.env.REACT_APP_API}/leaders/${currentUser.id}`,{...form})
    .then(e=>{
      dispatch(showNotification({ message: e.data.msg, status: 1 }))
      setForm(INIT_STATE);
    })
    .catch(err=>setErrorMessage(err.response.data.msg));
    setLoading(false);
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setForm({ ...form, [updateType]: value });
  };

  return (
    <>
      <TitleCard title="Profile Settings" topMargin="mt-2">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            labelTitle="Name"
            defaultValue={currentUser.fname}
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Email Id"
            defaultValue={currentUser.email}
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Title"
            defaultValue={currentUser.prfile}
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Place"
            defaultValue="California"
            updateFormValue={updateFormValue}
          />
        </div> */}
        {/* <div className="divider"></div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            type="password"
            updateType="curpassword"
            labelTitle="Current Password"
            defaultValue={form.curpassword}
            updateFormValue={updateFormValue}
          />
          <InputText
            type="password"
            updateType="password"
            labelTitle="New password"
            defaultValue={form.password}
            updateFormValue={updateFormValue}
          />
          <InputText
            type="password"
            updateType="npassword"
            labelTitle="Confirm new password"asd
            defaultValue={form.npassword}
            updateFormValue={updateFormValue}
          />
        </div>
        <ErrorText styleClass="mt-5 font-medium">
                {errorMessage}
              </ErrorText>
        <div className="mt-8">
          <button
            onClick={() => updateProfile()}
            className={"btn btn-accent float-right" + (loading ? " loading" : "")}
          >
            {!loading && "Update"}
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default ProfileSettings;
