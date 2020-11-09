import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import AuthApi from '../Services/AuthApi'
import Cookies from 'js-cookie';

function SourceLpn (props) {

    /*const [lodnum, setLodnum] = useState("");
    const [errorState, setErrorState] = useState();
    const [errorText, setErrorText] = useState("");*/

    const { onLodnumStateChange } = props;

    const [lodnumState, setLodnumState] = useState({
        errorState: false,
        errorText:"",
        onChange: false,
        pristine: true,
        touched: false,
        value: null
      });
    
   const lodnumInputRef = useRef(null);

  /*  useEffect(() =>{
        console.log(lodnumState.errorState);
        if(lodnumState.errorState){
            console.log(lodnumInputRef);
            lodnumInputRef.current.focus();
        }  
    },[lodnumState.errorState]);*/

    const Auth = React.useContext(AuthApi);

    const handleSourceLpnChange = e => {
        validateSourceLpn(e.target.value );
    }

    const validateSourceLpn = (srclpn) => {
        axios.get('ws/cws/tosgGetInventoryIdentifierDetails/' + srclpn,{
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials' : true
            },withCredentials: true ,
            credentials: 'include',
        }).then((response) =>{
              if(response.data.data.lodnum === srclpn){
               /* setLodnum(response.data.data.lodnum);
                setErrorState(false);
                setErrorText("");*/

                const updatedState = {
                    ...lodnumState,
                    errorState: false,
                    errorText:"",
                    onChange: false,
                    pristine: false,
                    touched: true,
                    value: response.data.data.lodnum
                  };

                  setLodnumState(updatedState);
                  onLodnumStateChange(updatedState);
    
                }else{
                    /*setLodnum(srclpn);
                    setErrorState(true);
                    setErrorText("Invalid Source Pallet LPN");*/

                    const updatedState = {
                        ...lodnumState,
                        errorState: true,
                        errorText:"Invalid Source Pallet LPN",
                        onChange: true,
                        pristine: false,
                        touched: true,
                        value: srclpn
                      };

                    setLodnumState(updatedState);
                    onLodnumStateChange(updatedState);
                }
                
                })
            .catch((error) => {
                if (error.response) {
                   /* setLodnum(srclpn);
                    setErrorState(true);
                    setErrorText("Invalid Source Pallet LPN");*/

                    const updatedState = {
                        ...lodnumState,
                        errorState: true,
                        errorText:"Invalid Source Pallet LPN",
                        onChange: true,
                        pristine: false,
                        touched: true,
                        value: srclpn
                      };

                      setLodnumState(updatedState);
                      onLodnumStateChange(updatedState);

                    Cookies.set("user", "loginfalse");
                    if(error.response.status===401){
                        Auth.setAuth(false);
                        Cookies.remove("user");
                    }
                  }
                });

    };

        return(
            <TextField
                    id="srclpn"
                    label="Source Pallet LPN"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onBlur={handleSourceLpnChange}
                    error={lodnumState.errorState}
                    helperText={lodnumState.errorText}
                    required
                    ref={lodnumInputRef}

                />
        )
}

export default SourceLpn;