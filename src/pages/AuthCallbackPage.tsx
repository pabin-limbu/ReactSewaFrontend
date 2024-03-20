// We need to create this page because we are using auth0 hook to access the token , since auth0providerWithNavigate is not wrapped or 
// inside of the auth0Provider we will not be able to get the token, this token from auth0 will be sent to backend in header for validating user.



import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AuthCallbackPage() {
  const navigate = useNavigate();
  const { user } = useAuth0(); // this gives us access to current loggedin user.
  const { createUser } = useCreateMyUser();

  const hasCreatedUser = useRef(false); // stores states value but when it is changed it doesnt rerender the component. this is to make sure that useEffect only runs once even if component rerender.

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }

    navigate("/");
  }, [createUser, navigate, user]); // this is done to ensure that this useeffect only runs once even if the component is being rerendered.

  return <div>Loading....</div>;
}

export default AuthCallbackPage;
