import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth';

const isActive = (history, path) => {
  if(history.location.pathname === path){
    return {color: "#ff9900"}
  }
  else{
    return {color: "#ffffff"}
  }
}


const Menu = ({history}) => (
  <div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link className="nav-link" to="/" style={isActive(history, "/")}>Home</Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/users" style={isActive(history, "/users")}>Users</Link>
      </li>

      {!isAuthenticated() && (
        <>
        <li className="nav-item">
          <Link className="nav-link" to="/signin" style={isActive(history, "/signin")}>Sign In</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup" style={isActive(history, "/signup")}>Signup</Link>
        </li>
      </>
      )}

      {isAuthenticated() && (
        <>
          <li className="nav-item">
            <span className="nav-link"
              style={isActive(history, "/signout"),{cursor: "pointer", color:"#fff"}}
              onClick={() => signout(() => history.push("/"))}>
              Signout
            </span>
          </li>

          <li className="nav-item">
              <Link className="nav-link" to={`/user/${isAuthenticated().user._id}`} style={isActive(history, `/user/${isAuthenticated().user._id}`)}>
                {`${isAuthenticated().user.name}'s profile`}
              </Link>
          </li>
        </>
      )}

    </ul>

  </div>
);

export default withRouter(Menu);
