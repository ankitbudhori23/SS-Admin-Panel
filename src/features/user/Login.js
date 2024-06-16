import { useState } from "react";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setuser } from "../common/userSlice";

function Login() {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const INITIAL_LOGIN_OBJ = {
    password: "",
    username: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (loginObj.username.trim() === "")
      return setErrorMessage("Username is required!");
    if (loginObj.password.trim() === "")
      return setErrorMessage("Password is required!");
    else {
      setLoading(true);
      await axios
        .post(`/auth`, {
          username: loginObj.username,
          password: loginObj.password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          axios.defaults.headers.common["x-auth-token"] =
            `${localStorage.getItem("token")}`;
          dispatch(setuser(res.data.data));
          nav("/app/dashboard");
          // console.log("res",res);
        })
        .catch((err) => {
          if (err.response) setErrorMessage(err.response.data.data);
          else setErrorMessage("Server Down ,Contact tech team");
          // console.log("error",err);
        });
      setLoading(false);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="p-3 max-md:hidden">
            <img
              src="https://picsum.photos/600"
              className="rounded-lg h-full w-full"
              alt="img"
            />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                <InputText
                  type="username"
                  defaultValue={loginObj.username}
                  updateType="username"
                  containerStyle="mt-4"
                  labelTitle="username"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  defaultValue={loginObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
              </div>
              <ErrorText styleClass="mt-5 mb-2 font-medium">
                {errorMessage}
              </ErrorText>
              <button
                type="submit"
                className={
                  "btn mt-5 w-full btn-accent" + (loading ? " loading" : "")
                }
              >
                {!loading && "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
