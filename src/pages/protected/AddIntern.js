import {useState,useEffect} from "react";
import InputText from "../../components/Input/InputText";
import SelectBox from "../../components/Input/SelectBox";
import ErrorText from "../../components/Typography/ErrorText";
import axios from "axios";
import {useDispatch} from "react-redux";
import {showNotification,setPageTitle} from "../../features/common/headerSlice";
import {removeuser} from "../../features/common/presentInternSlice";
import {Intern_Departments,Leaders} from "../../utils/Data";
import TitleCard from "../../components/Cards/TitleCard";
import { useLocation,useNavigate} from "react-router-dom";

function AddIntern(){
    const {state} = useLocation();
    const nav=useNavigate();
    const dispatch=useDispatch();

    useEffect(() => {
      state === null ?
      dispatch(setPageTitle({ title : "Add Intern"})) :
      dispatch(setPageTitle({ title : "Edit Intern"}))
    }, [])
   
    const INITIAL_LOGIN_OBJ = {
        fname: state===null ? " ": state.fname,
        lname:  state===null ? " ": state.lname,
        phone: state===null ? " ": state.phone,
        email: state===null ? " ": state.email,
        duration_month: state===null ? " ": state.duration_month,
        profile: state===null ? " ": state.profile,
        starting_date: state===null ? " ": state.starting_date.slice(0,10),
        ending_date: state===null ? " ": state.ending_date.slice(0,10),
        leader: state===null ? " ": state.leader,
        education: state===null ? " ": state.education,
      };
    const duration=["1","2","3","6"];
      const [form, setForm] = useState(INITIAL_LOGIN_OBJ);
      const [errorMessage, setErrorMessage] = useState("");
      const [loading, setLoading] = useState(false);
   
      const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setForm({ ...form, [updateType]: value });
      };

      const method = state===null ? axios.post : axios.patch ;
      const par= state===null ? "" : state.id;
      const submitForm =async(e)=>{
        e.preventDefault(); 
        if (form.fname.trim() === "" || form.leader.trim() === "" || form.starting_date.trim() === "" || form.email.trim() === "" || form.profile.trim() === "")
        return setErrorMessage("All fields is required!");
        setLoading(true);
        await method(`${process.env.REACT_APP_API}/interns/${par}`, {
         ...form
        })
        .then((res) => {
          dispatch(showNotification({ message: res.data.msg, status: 1 }));
          dispatch(removeuser());
          state !== null && nav('/app/interns',{ replace: true });
          setForm(INITIAL_LOGIN_OBJ);
        })
        .catch((err) => {
          setErrorMessage(err.response.data.error);
        });

        setLoading(false);
      }

    return(
        <TitleCard
        title={state === null ? "Add Intern" : "Edit Intern"}
        topMargin="mt-2"
      >
            <div className="max-w-md m-auto">
            <form onSubmit={(e) => submitForm(e)}>
             <div className="flex space-x-3">
                <InputText
                  type="text"
                  defaultValue={form.fname}
                  updateType="fname"
                  containerStyle="mt-2"
                  labelTitle="First Name"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  type="text"
                  defaultValue={form.lname}
                  updateType="lname"
                  containerStyle="mt-2"
                  labelTitle="Last Name"
                  updateFormValue={updateFormValue}
                />
                </div>
                <InputText
                  type="text"
                  defaultValue={form.phone}
                  updateType="phone"
                  containerStyle="mt-2"
                  labelTitle="Phone No. (10 digit)"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  type="email"
                  defaultValue={form.email}
                  updateType="email"
                  containerStyle="mt-2"
                  labelTitle="Email ID"
                  updateFormValue={updateFormValue}
                />
                <div className="flex space-x-3">
                <SelectBox
                labelTitle="Duration in Months"
                options={duration}
                defaultValue={form.duration_month} 
                updateFormValue={updateFormValue}
                updateType="duration_month"
                containerStyle="mt-2"
                />
                <SelectBox
                labelTitle="Profile"
                options={Intern_Departments}
                defaultValue={form.profile} 
                updateFormValue={updateFormValue}
                updateType="profile"
                containerStyle="mt-2"
                />
                </div>
                <div className="flex space-x-3">
                <InputText
                  type="date"
                  defaultValue={form.starting_date}
                  updateType="starting_date"
                  containerStyle="mt-2"
                  labelTitle="Joining date"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  type="date"
                  defaultValue={form.ending_date}
                  updateType="ending_date"
                  containerStyle="mt-2"
                  labelTitle="End date"
                  updateFormValue={updateFormValue}
                />
                </div>
                <div className="flex space-x-3">
                <SelectBox
                labelTitle="Leader"
                options={Leaders}
                defaultValue={form.leader} 
                updateFormValue={updateFormValue}
                updateType="leader"
                containerStyle="mt-2"
                />
                <InputText
                  type="text"
                  defaultValue={form.education}
                  updateType="education"
                  containerStyle="mt-2"
                  labelTitle="Education Qualification"
                  updateFormValue={updateFormValue}
                />
                </div>
              
                 <ErrorText styleClass="mt-3 font-medium">
                {errorMessage}
              </ErrorText>
                <button
                type="submit"
                className={
                  "btn mt-7 w-full btn-accent" + (loading ? " loading" : "")
                }
              >
                {!loading && state===null ?  "Add intern" : "Edit intern"}
              </button>
            </form>
            </div>
</TitleCard>
    )
}

export default AddIntern