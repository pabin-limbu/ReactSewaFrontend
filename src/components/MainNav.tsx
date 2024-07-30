import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserNameMenu from "./UserNameMenu";
import { Link } from "react-router-dom";

function MainNav() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  //isAuthenticated lets us know is user is logged in or not.
  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <UserNameMenu />
          <span className="text-white"> | </span>
          <Link className=" text-white" to={"/order-status"}>
            Orders
          </Link>
        </>
      ) : (
        <Button
          variant={"ghost"}
          className="font-bold text-white hover:bg-white"
          onClick={async () => await loginWithRedirect()}
        >
          Login
        </Button>
      )}
    </span>
  );
}

export default MainNav;
