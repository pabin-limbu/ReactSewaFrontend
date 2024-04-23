import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  //vite bata banayeko app ma import.meta,env use garcha environment variable access garnu
  //invironmental variable ko prefix VITE_ hunu parcha.
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  const navigate = useNavigate();

  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error(
      " Unable to initaialise auth , domain,clientid or redirectUri missing"
    );
  }

  const onRedirectCallback = (appState?:AppState) => {
    //appState?: AppState, user?: User these are the optional params.
    //yo funciton auth0 le redirect garepacih call huncha as callback ,gives us user data.
    //params ma questionmark haeko bhaneko optional params ho.

    // when auth0 login page redirect us back this function will run, this will navigate us to auth-callback page and authcall back page will
    // run some logic of user creation and run redirect back to home page.
    // user creation logic lai yo page ma kina narakheko bhanda it has to send user token sent back by auth0
    // token access garnu lai useAuth0 hook chalaunu parcha getUserAccesstokensilently ma token only comes when that component is wrapped by auth0provider component.
    // token backend ma pathaunu parcha to strict the api from being exposed to non loggedin user call to api.
    navigate(appState?.returnTo || "/auth-callback");
  };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;

// note:
// - yo file lai main ko browser router bhanda one step down rakhnu because all route will need auth0 data.
