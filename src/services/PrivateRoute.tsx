import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from '../redux/store';


const PrivateRoute = ():any => {
    const auth = useSelector((state:RootState) => state.auth.autorized);
    return auth ? <Navigate to={'/messenger'}/> : <Navigate to={'/login'}/>;
  }

  export default PrivateRoute;