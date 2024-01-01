import React from "react";
import { SignupForm } from "../components/auth/SignupForm";
import { UserDetailsForm } from "../components/auth/UserDetailsForm";

const SignupPage = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignupForm />
      <UserDetailsForm />
    </div>
  );
};

export default SignupPage;
