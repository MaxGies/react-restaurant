import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import {
    Link,
    useRouteMatch
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    imgBanner: {
        width: '100%',
        height: '30vh',
        objectFit: 'cover',
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        width: '70%',
    },
    image: {
        width: 200,
        height: '100%',
        cursor: 'default',
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    buttonRoot: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          margin: theme.spacing(1),
        },
    },
    btnDec: {
        textAlign: 'center',
    }
}));

const Restaurant = (props) => {
    const classes = useStyles();
    let matchUrl = useRouteMatch();
    // const userInfo = useSelector(state => state.user);
    const [timeValue, setTimeValue] = useState(new Date().toLocaleTimeString('TH'));

    useEffect(()=>{
        const timer = setInterval(() => { setTimeValue(new Date().toLocaleTimeString('TH')); }, 1000);

        return () => {
            clearInterval(timer);
        }

    },[timeValue])

    return(
        <div>
            <img src={props.dataRestaurant.img} alt={props.dataRestaurant.name} className={classes.imgBanner} />
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                        <img className={classes.img} alt="complex" src={props.dataRestaurant.img} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={6} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                            {props.dataRestaurant.name.toUpperCase()}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                            {props.dataRestaurant.detail}
                            </Typography>
                        </Grid>
                        <Grid item className={classes.buttonRoot}>
                            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                {
                                    props.dataRestaurant.timeService.map((time, index)=>{
                                        return(
                                        timeValue < time  ? ( //&& props.dataRestaurant.tableService < userInfo.filter((item)=>item.queueRestaurantInfo.id === props.dataRestaurant.id).find((item)=> item.queueTime.toString() === time.toString()).queueNumOfTable
                                                <Button key={index} component={Link} to={`${matchUrl.url}/${props.dataRestaurant.name.replace(/\s/g, '')}service${time}`} className={classes.btnDec}>
                                                    {time} <br /> table Left
                                                </Button>
                                            )
                                        :
                                            (
                                            <Button key={index} className={classes.btnDec} disabled>
                                                {time} <br /> table Left
                                            </Button>
                                            )
                                        )
                                            
                                    })
                                }
                            </ButtonGroup>
                        </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">{timeValue.match(/\d{2}:\d{2}|[AMP]+/g).join(' ')}</Typography>
                        </Grid>
                    </Grid>
                    </Grid>
                </Paper>
                </div>
        </div>
    )
}

export default Restaurant;