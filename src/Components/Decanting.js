import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import SourceLpn from './SourceLpn';
import Item from './Item';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { CardMedia } from '@material-ui/core';


class Decanting extends Component {
    
    constructor(props){
        super(props);

        this.state={
            lodnum:'',
            lodnumError: false,
            item:'',
            itemError :false,
            itemDescription:'',
            itemImage:'',
            ustcas:'',
            totalUnits:''
        }
    }

    handleLodnumStateChange =(updatedState) => {
        console.log("updatedState: ", updatedState);
        this.setState({
            ...this.state,
            lodnum: updatedState.value,
            lodnumError: updatedState.error    
        });

        console.log(this.state.lodnum);
    }

    handleItemStateChange = (updatedState) => {
        console.log("updatedState for the ITEM STATE: ", updatedState);
        this.setState({
            ...this.state,
            itemError:updatedState.error,
            item:updatedState.value,
            itemDescription:updatedState.itemDescription,
            itemImage:updatedState.itemImage,
            untcas:updatedState.untcas,
            totalUnits:updatedState.totalUnits  
        });
    }

    render(){
        return (
        <Container >
            <Grid item xs={10}>
                <SourceLpn onLodnumStateChange={this.handleLodnumStateChange}/>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Box m={1} pt={1}>
                        
                    <CardMedia width="250" height="250" component='img' src={this.state.itemImage} />
                    </Box>
                </Grid>    

                <Grid item xs={3}>
                   <Item {...this.state} onItemStateChange={this.handleItemStateChange}/>

                    <TextField
                        id="item-description"
                        label="Item Description"
                        style={{ margin: 8}}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={this.state.itemDescription}
                        disabled
                    />

                    <TextField
                        id="pick-zone"
                        label="Designated Pick Zone"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />

                    <TextField
                        id="wrapping-type"
                        label="Wrapping Type"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />

                </Grid>
                <Grid item xs={3}>
                    <TextField
                        id="total-units"
                        label="Total Units"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={this.state.totalUnits}
                        disabled
                    />

                    <TextField
                        id="num-of-lbls"
                        label="Number of Labels To Print"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />

    

                    <FormControl variant="outlined" style={{margin:8, minWidth: 270}}>
                    <InputLabel id="suggested-tote-label">Suggested Tote</InputLabel>
                        <Select
                        labelId="suggested-tote-label"
                        id="suggested-tote"
                        label="Suggested Tote*"
                        required
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Tote1</MenuItem>
                        <MenuItem value={20}>Tote2</MenuItem>
                        <MenuItem value={30}>Tote3</MenuItem>
                        </Select>
                    </FormControl>
       

                    <TextField
                        id="actual-tote-wt"
                        label="Actual Tote Weight"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </Grid>
                
                <Grid item xs={2}>
                    <TextField
                        id="untcas"
                        label="Units Per Case"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={this.state.untcas}
                        disabled
                    />
        
                    <Box m={1} pt={1}>
                        <Button variant="outlined" color="primary" size="large" >
                            Print
                        </Button>
                    </Box>
                    <Box m={1.7}>

                    </Box>

                    <TextField
                        id="units-per-tote"
                        label="Suggested Units Per Tote"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />

                    <FormLabel component="legend">Tote Level</FormLabel>
                    <RadioGroup row aria-label="Tote Level" name="tote-level">
                        <FormControlLabel value="0" control={<Radio color="primary" />} label="Partial" />
                        <FormControlLabel value="1" control={<Radio color="primary" />} label="Full" />
                    </RadioGroup>
    
                </Grid>          
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                <TextField 
                        id="destination-lpn"
                        label="Destination Pallet LPN"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        multiline
                        required
                    />

                <TextField 
                        id="decanting-instructions"
                        label="Decanting Instructions"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        multiline
                    />

                <TextField 
                        id="special-instructions"
                        label="Special Instructions"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        multiline
                    />
                </Grid>
                <Grid item xs={2}>
                    <Box m={1} pt={1}>
                        <Button variant="outlined" color="primary" size="large" >
                            Confirm
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
        )
    }
  }

  export default Decanting;

