import React, {useState} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AuthApi from '../Services/AuthApi'
import Cookies from 'js-cookie';


function SignIn() {
    const [userName, setUserName] = useState("");
    const [password, setPassWord] = useState("");

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassWord(e.target.value);
    }

    const Auth = React.useContext(AuthApi);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`/ws/auth/login?usr_id=${userName}&password=${password}`,{
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials' : true
            },withCredentials: true ,
            credentials: 'include',
          }, {timeout: 100}).then((response) =>{
                console.log("Authenticated ");
                Auth.setAuth(true);
                console.log(Cookies.get('MOCA-WS-SESSIONKEY'));
                Cookies.set("user", "loginTrue");
            })
            .catch((error) => {
                    console.log({error}) // this will log an empty object with an error property
                });
    }

        return(
            <Container maxWidth="sm" >
                <form onSubmit={handleSubmit} >
                    <h2 className="grey-text text-darken-3">
                        Sign In
                    </h2>
                    <div >
                        <TextField
                            id="userName"
                            label="User Name"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            onBlur={handleUserNameChange}
                        />
                    </div>
                    <div >
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            onBlur={handlePasswordChange}
                        />
                    </div>
                    <div >
                        <Button variant="contained" color="primary" onClick={handleSubmit} style={{ margin: 15 }}>
                            Login
                        </Button>
                    </div>
                </form>
            </Container>
        )
}

export default SignIn;