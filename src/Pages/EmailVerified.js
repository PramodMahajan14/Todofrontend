import react from "react";
// import { BsArrowLeft } from "react-icons/bs";
// import { useRouter } from "next/router";
// import classes from "./EmailVerified.module.css";
import "./EmailVerified.css";

const EmailVerified = () => {
  return (
    <>
      <div className="circle">
        <img src="./circle_tick.png"></img>
        {/* <br></br>
            <p>You have successfully verified</p>
            <p>your email.</p> */}
      </div>
      <div className="txt">
        <p>You have successfully verified</p>
        <p>your email.</p>
      </div>
    </>
  );
};
export default EmailVerified;
