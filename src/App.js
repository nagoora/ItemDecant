import './App.css';
import Decanting from './Components/Decanting'
import SignIn from './Components/SignIn'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import React from 'react';
import AuthApi from './Services/AuthApi';
import Cookies from 'js-cookie';

function App() {

  const [auth, setAuth] = React.useState(false);
  const readCookie =() =>{
    const user = Cookies.get("user");
    if(user){
      setAuth(true);
    }
  }

  React.useEffect (()=> {
    readCookie();
  }, [])

  return (
    <div className="App">
    <AuthApi.Provider value={{auth, setAuth}}>
     <BrowserRouter>
        <Routes />
      </BrowserRouter>
      </AuthApi.Provider>
    </div>
  );
}

const Routes =() => {
  const Auth = React.useContext(AuthApi);
  return(
    <Switch>
      <ProtectedRoute exact path='/Decanting' auth={Auth.auth} component={Decanting} />
      <ProtectedLogin path='/signin' component={SignIn} auth={Auth.auth}/>
  </Switch>
  )
}

const ProtectedRoute = ({auth, component:Component, ...rest}) => {
  return(
    <Route 
      {...rest}
      render ={()=> auth ? (
        <Component />
        ) :
        (
          <Redirect to='/signin' />
        )
      }
    />
  )
}

const ProtectedLogin = ({auth, component:Component, ...rest}) => {
  return(
    <Route 
      {...rest}
      render ={()=> !auth ? (
        <Component />
        ) :
        (
          <Redirect to='/Decanting' />
        )
      }
    />
  )
}

export default App;
