import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import RestaurantCard from '../components/RestaurantCard';

import { userActions } from '../store/user';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 40,
    },
    card: {
        maxWidth: 345,
    },
    headText: {
        marginBottom: 50,
    },
    dec: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        margin: 20,

    },
  });

const Queue = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user);

    const removeHandler = (resData) =>{
        dispatch(userActions.removeTable(resData));
    }

    return(
        <div className={classes.root}>
            <Typography className={classes.headText} variant="h4" gutterBottom >
                Your Queue!
            </Typography>
            {
                userInfo.map((data, index) => 
                    <div key={index}>
                        <RestaurantCard data={data.queueRestaurantInfo}  />
                        <div className={classes.dec}>
                        <Button variant="contained" color="primary" onClick={() => removeHandler(data)}>
                            Finish
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => removeHandler(data)}>
                            Remove
                        </Button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Queue;