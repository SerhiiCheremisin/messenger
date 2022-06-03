import React, {useEffect} from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import PrivateRoute from './services/PrivateRoute';
import { makeStyles } from '@mui/styles';
import ThemeConfig from './services/theme/theme';


//components
import Login from './pages/Login';
import Messenger from './pages/Messenger';


const useStyles = makeStyles({
root : {
 padding: 0,
 margin: 0,
 boxSizing: 'border-box',
 width: '100%',
}
})

function App() {

const classes = useStyles();
  return (
    <ThemeConfig>
     <div className={classes.root}>
      {}
       <Routes>
         <Route path='/' element={<PrivateRoute/>}/>
         <Route path='/messenger' element={<Messenger/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='*' element={<h2>This page does not exsist</h2>}/>
       </Routes>
     </div>
    </ThemeConfig>

  );
}

export default App;
