import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const loginSubmit = (e) => {
    console.log(e);
  };

  const loginContainer = {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#191D3A",
    color:"white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const formContainer = {
    height:"40vh",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
  };

  const inputContainers = {
    padding: ".75rem",
    width: "30vw",
    height:"auto",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    position:"relative",
  };

  const loginLabels = {
    textAlign: "left",
    marginBottom: "1rem",
    width: "inherit",
  };

  const loginTextInputs = {
    padding: ".5rem",
    borderRadius: "10px",
    width: "inherit",
    border: ".15rem solid gray",
    height:"1.5rem"
  };
  const loginSubmitInputs = {
    padding: ".5rem",
    borderRadius:"10px",
    width:"25vw",
    border:".15rem solid gray",
    height:"2.5rem"
  };
  const loginErrors = {
      textAlign:"center",
  };

  return (
    <div style={loginContainer}>
      <form onSubmit={handleSubmit(loginSubmit)} style={formContainer}>
        <div style={inputContainers}>
          <label style={loginLabels} htmlFor="user">
            Username:
          </label>
          <input
            type="text"
            placeholder="Username"
            id="user"
            style={loginTextInputs}
            onFocus={() => setTimeout(() => clearErrors(), 5000)}
            {...register("user", { required: "Username required" })}
          />
          {errors.user && <p style={loginErrors}>{errors.user.message}</p>}
        </div>
        <div style={inputContainers}>
          <label style={loginLabels} htmlFor="pass">
            Password:
          </label>
          <input
            type="password"
            placeholder="Password"
            id="pass"
            style={loginTextInputs}
            onBlur={() => clearErrors()}
            {...register("pass", { required: "Password required" })}
          />
          {errors.pass && <p style={loginErrors}>{errors.pass.message}</p>}
        </div>
        <div style={inputContainers}>
          <input type="submit" value="Login" style={loginSubmitInputs} />
        </div>
      </form>
    </div>
  );
};

export default Login;
