import { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
// import { useSelector, useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import RestaurantData from './json/restaurants.json';

import NavBar from './components/NavBar';
import Restaurants from './pages/Restaurants';
import Restaurant from './pages/Restaurant';
import RestaurantService from './pages/RestaurantService';
import Queue from './pages/Queue';

// import { sendData, fetchCardData } from './store/user-action'

// let isInitial = true;

const App = () => {
  // const dispatch = useDispatch();
  const dataRestaurant = RestaurantData;
  // const userInfo = useSelector(state => state.user);

  // useEffect(()=>{
  //     dispatch(fetchCardData())
  // },[dispatch])
  
  // useEffect(()=>{

  //   if( isInitial ){
  //     isInitial = false;
  //     return;
  //   }

  //   dispatch(sendData(userInfo))
  // },[userInfo, dispatch])

  return (
    
    <Router>
      <Fragment>
        <CssBaseline />
          <NavBar/>
          <Switch>
            {
              dataRestaurant.map((resData,index)=>{
                const urls = resData.name.replace(/\s/g, '')
                return(
                  <Route key={index} path={`/${urls}/${urls}service:timeLink`}> 
                    <RestaurantService dataRestaurant={resData}/>
                  </Route>
                )
              })
            }
            {
              dataRestaurant.map((resData)=>{
                const url = resData.name.replace(/\s/g, '')
                return(
                  <Route key={resData.id} path={"/" + url }>
                    <Restaurant dataRestaurant={resData}/>
                  </Route>
                )
              })
            }
            <Route path={"/Queue"}>
              <Queue/>
            </Route>
            <Route path={["/Home", "/"]} >
              <Restaurants dataRestaurant={dataRestaurant}/>
            </Route>
          </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
