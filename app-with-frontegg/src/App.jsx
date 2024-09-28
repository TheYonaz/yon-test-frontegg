import './App.css';
import { useAuth, useLoginWithRedirect, ContextHolder } from "@frontegg/react";
import { AdminPortal } from '@frontegg/react';
import TenantsSwitcher from './TenantsSwitcher.jsx';
import ActiveTenants from './Activetenants.jsx';

function App() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  const handleClick = () => {
    AdminPortal.openHosted();
  };
  

  return (
    <div className="App">
      <ActiveTenants />
      
      { isAuthenticated ? (
        <div>
          <div>
            <img src={user?.profilePictureUrl} alt={user?.name}/>
          </div>
          <div>
            <span>Logged in as: {user?.name}</span>
          </div>
          <div>
            <button onClick={() => alert(user.accessToken)}>What is my access token?</button>
          </div>
          <div>
            <button onClick={() => logout()}>Click to logout</button>
          </div>
          <button onClick={handleClick}>Settings</button>
        </div>
      ) : (
        <div>
          <button onClick={() => loginWithRedirect() }>Click me to login</button>
        </div>
      )}
    </div>
  );
}

export default App;