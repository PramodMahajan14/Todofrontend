import { useState, useEffect } from "react";
import "./index.css";
const Verify = () => {
  const [email, setemail] = useState("");
  useEffect(() => {
    setemail(localStorage.getItem("email"));
  }, []);
  return (
    <>
      <div class="container">
        <div class="d-flex justify-content-end">
          <div>
            <h4 className="btn-back">Back</h4>
          </div>
        </div>
        <div class="row vertical-center">
          <h5>We have send an email to "{email}"</h5>
        </div>
      </div>
    </>
  );
};

export default Verify;
