import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {
    useParams
} from "react-router-dom";

import { userActions } from '../store/user';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 40,
        border: '2px solid grey',
        borderRadius: 5,
    },
    text: {
        marginLeft: 20,
        marginTop: 30,
    },
    subText: {
        marginLeft: 20,
    },
    dataField: {
        margin: 40,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputField: {
        width: '80%',
        marginBottom: 40,
    },
    sendButton: {
        marginTop: 40,
        marginBottom: 20,
        borderRadius: 50,
    },
    sendButtonDisable: {
        marginTop: 40,
        marginBottom: 20,
        borderRadius: 50,
    },
}));


const RestaurantService = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [customer, setCustomer] = useState();
    const [table, setTable] = useState();
    const [userTable, setUserTable] = useState(0);
    const [open, setOpen] = useState(false);
    const { timeLink } = useParams();
    const userInfo = useSelector(state => state.user);

    useEffect(() => {

        setUserTable(userInfo.filter((item)=>item.queueRestaurantInfo.id === props.dataRestaurant.id).find((item)=> item.queueTime.toString() === timeLink.toString()));
        
    },[props.dataRestaurant, timeLink, userInfo, userTable])

    useEffect(()=>{
        setTable(Math.ceil(customer/4));
    },[customer]);

    const inputCustomerHandler = event => {
        const customerPopulation = event.target.value.replace(/[^0-9]/g, '');
        setCustomer(customerPopulation);
    }

    const handleClick = () => {

        setOpen(true);

        dispatch(userActions.addTable( { queueRestaurantInfo : props.dataRestaurant, queueTime: timeLink.toString(), queueNumOfTable: table } ));
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    return(
        <div >
            <Container maxWidth="sm" className={classes.root}>
                <Typography variant="h4" gutterBottom className={classes.text}>
                    {props.dataRestaurant.name.toUpperCase()}
                </Typography>
                <Typography variant="h6" gutterBottom className={classes.subText}>
                    {timeLink}
                </Typography>
                <div className={classes.dataField}>
                    <TextField className={classes.inputField} required id="standard-required" label="Number of Guest" onChange={inputCustomerHandler} />
                    <Typography variant="h5" gutterBottom className={classes.text}>
                        Table Use : {table || 0}
                    </Typography>
                    <Typography variant="h5" gutterBottom className={classes.text}>
                        Table Left : {userTable ? props.dataRestaurant.tableService - userTable.queueNumOfTable : props.dataRestaurant.tableService}
                    </Typography>
                    {
                        (userTable ? props.dataRestaurant.tableService - userTable.queueNumOfTable : props.dataRestaurant.tableService) >= table && table !== 0 ? (
                        <Button className={classes.sendButton} variant="contained" color="primary" onClick={handleClick}>
                            Send Queue
                        </Button>
                        ):(
                        <Button className={classes.sendButton} color="secondary">
                            Send Queue
                        </Button>
                        )
                    }
                    
                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                        {1?(
                            <Alert onClose={handleClose} severity="success">Queue Request Complete!</Alert>
                        ):(
                            <Alert onClose={handleClose} severity="error">Queue Request Failed!</Alert>
                        )}
                    </Snackbar>
                </div>
            </Container>
        </div>
    )
}

export default RestaurantService;