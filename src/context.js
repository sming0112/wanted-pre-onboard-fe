import { useState, createContext } from "react";

export const SignContext = createContext();

function ContextProvider(props) {
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasValidation, setHasValidation] = useState(false);
  const [update, setUpdate] = useState(false);

  const access_token = localStorage.getItem("token");
  return (
    <SignContext.Provider
      value={{
        signup,
        setSignup,
        email,
        setEmail,
        password,
        setPassword,
        hasValidation,
        setHasValidation,
        access_token,
        update,
        setUpdate,
      }}
    >
      {props.children}
    </SignContext.Provider>
  );
}

export default ContextProvider;
