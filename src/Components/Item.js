import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import AuthApi from '../Services/AuthApi'
import Cookies from 'js-cookie';

function Item (props) {

    console.log("PROPS " + props);

    const { onItemStateChange } = props;

    const [itemState, setItemState] = useState({
        errorState: false,
        errorText:"",
        onChange: false,
        pristine: true,
        touched: false,
        value: null,
        itemDescription: "",
        itemImage:"",
        untcas:"",
        totalUnits:""
      });

    const Auth = React.useContext(AuthApi);


    const handleItemChange =e =>{
        validateItem(e.target.value);
    }

    const validateItem = (item) =>{
        axios.get('ws/cws/tosgGetItemQtyOnLodnum?lodnum=' + props.lodnum +'&prtnum='+ item +'&wh_id=WIAW',{
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials' : true
            },withCredentials: true ,
            credentials: 'include',
        }).then((response) =>{
              if(response.data.data[0].prtnum === item){
                console.log(response.data.data[0]);
                const updatedState = {
                    ...itemState,
                    errorState: false,
                    errorText:"",
                    onChange: false,
                    pristine: false,
                    touched: true,
                    value: response.data.data[0].prtnum,
                    itemDescription: response.data.data[0].item_description,
                    itemImage:response.data.data[0].img_src,
                    untcas : response.data.data[0].untcas,
                    totalUnits: response.data.data[0].total_units
                  };

                  setItemState(updatedState);
                  onItemStateChange(updatedState);
    
                }else{
                    /*setLodnum(srclpn);
                    setErrorState(true);
                    setErrorText("Invalid Source Pallet LPN");*/
                    console.log("ERROR ELSE PART");
                    const updatedState = {
                        ...itemState,
                        errorState: true,
                        errorText:"Invalid Item",
                        onChange: true,
                        pristine: false,
                        touched: true,
                        value: item,
                        itemDescription:"",
                        untcas:"",
                        totalUnits:""
                      };

                    setItemState(updatedState);
                    onItemStateChange(updatedState);
                }
                
                })
            .catch((error) => {
                console.log("ERROR CATCH PART" + error);
                const updatedState = {
                    ...itemState,
                    errorState: true,
                    errorText:"Invalid Item",
                    onChange: true,
                    pristine: false,
                    touched: true,
                    value: item,
                    itemDescription:"",
                    untcas:"",
                    totalUnits:""
                  };
                
                  setItemState(updatedState);
                  onItemStateChange(updatedState);

                if (error.response) {
                   /* setLodnum(srclpn);
                    setErrorState(true);
                    setErrorText("Invalid Source Pallet LPN");*/

                    Cookies.set("user", "loginfalse");
                    if(error.response.status===401){
                        Auth.setAuth(false);
                        Cookies.remove("user");
                    }
                  }
                });

    }

    return(
        <TextField
        id="item"
        label="Item"
        style={{ margin: 8 }}
        fullWidth
        margin="normal"
        InputLabelProps={{
            shrink: true,
        }}
        variant="outlined"
        required
        onBlur={handleItemChange}
        error={itemState.errorState}
        helperText={itemState.errorText}

    />

    );
}

export default Item;