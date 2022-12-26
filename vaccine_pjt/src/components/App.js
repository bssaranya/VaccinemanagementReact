// import default & installed packages
import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import '../index.css';

// import other files
import { resetErrorMessage, resetSuccessMessage } from '../actions';
import history from '../history';
import PrivateRouting from './PrivateRouting';
import NavBar from './header/NavBar';

// import components
import Dashboard from './dashboard/Dashboard';
import Home from './Home';
import ChangePassword from './ChangePassword';
import PersonListing from './PersonManagement/PersonListing';
import PersonAddEdit from './PersonManagement/PersonAddEdit';
import Report from './ReportManagement/Report';
import VaccinationList from './vaccineManagement/VaccinationList';
import VaccineRegistration from './vaccineManagement/VaccineRegistration';

// set configuration for toaster
const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

const App = () => {
  const dispatch = useDispatch();
  const { islogin } = useSelector((state) => state.authReducer);
  const { successMessage, errorMessage } = useSelector(
    (state) => state.commonReducer
  );

  // useEffect for setting toaster
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, toastConfig);
      dispatch(resetSuccessMessage());
    } else if (errorMessage) {
      toast.error(errorMessage, toastConfig);
      dispatch(resetErrorMessage);
    }
  }, [successMessage, errorMessage]);

  return (
    <>
      <ToastContainer /> {/* toaster component */}
      <Router history={history}>
        <NavBar />
        {/* PUBLIC ROUTING */}
        <Route path="/" exact component={Home} />
        <Switch>
          {/* PRIVATE ROUTING */}

          {/* Dashboard */}
          <PrivateRouting path="/admin-dashboard" isAuthenticated={islogin}>
            <Dashboard />
          </PrivateRouting>

          {/* Listing registered persons */}
          <PrivateRouting path="/person-listing" isAuthenticated={islogin}>
            <PersonListing />
          </PrivateRouting>

          {/* Register a person */}
          <PrivateRouting path="/person-add" isAuthenticated={islogin}>
            <PersonAddEdit />
          </PrivateRouting>

          {/* Edit registered details of user */}
          <PrivateRouting path="/person-edit/:id" isAuthenticated={islogin}>
            <PersonAddEdit />
          </PrivateRouting>

          {/* Get Reports */}
          <PrivateRouting path="/report" isAuthenticated={islogin}>
            <Report />
          </PrivateRouting>

          {/* Registration for vaccine */}
          <PrivateRouting path="/vaccine-add" isAuthenticated={islogin}>
            <VaccineRegistration />
          </PrivateRouting>

          {/* list the vaccine registration details */}
          <PrivateRouting path="/vaccine-listing" isAuthenticated={islogin}>
            <VaccinationList />
          </PrivateRouting>

          {/* Change Password */}
          <PrivateRouting path="/change-password" isAuthenticated={islogin}>
            <ChangePassword />
          </PrivateRouting>
        </Switch>
      </Router>
    </>
  );
};

export default App;
