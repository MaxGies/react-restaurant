import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import {
    Link
} from "react-router-dom";

import RestaurantCard from '../components/RestaurantCard';
import SearchCard from '../components/SearchCard'

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
      marginTop: 20,
    },
    link: {
      textDecoration: 'none',
      color: 'black',
    }
}));

const Restaurants = (props) => {
    const [searchValue, setSearchValue] = useState("");
    const classes = useStyles();

    return (
    <>
        <SearchCard searchValue={setSearchValue}/>
        <Grid container justifyContent="center" spacing={6} className={classes.root}>
            {props.dataRestaurant.filter((data)=>{
                if(searchValue === ""){
                    return data;
                }else if(data.name.includes(searchValue.toLowerCase())){
                    return data;
                }
                return 0;
            }).map((data)=>{
                const url = data.name.replace(/\s/g, '');
                return(
                    <Grid item key={data.id} >
                        <Link to={"/" + url} className={classes.link}> 
                            <RestaurantCard data={data}/>
                        </Link>
                    </Grid>
                )
            })}
        </Grid>
    </>
    );
}

export default Restaurants;


