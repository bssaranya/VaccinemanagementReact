import { combineReducers } from 'redux';
import Cookies from 'js-cookie';

// ===================================================================
// COMMON REDUCER

// reducer for setting the toaster messages
const initialStateCommon = {
  isOpen: false,
  successMessage: null,
  errorMessage: null,
};
const commonReducer = (state = initialStateCommon, action) => {
  switch (action.type) {
    case 'SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: action.payload,
      };
    case 'ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: action.payload,
      };
    case 'RESET_SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: null,
      };
    case 'RESET_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: null,
      };
    default:
      return state;
  }
};

// ===================================================================
// AUTH REDUCER

// reducer for setting the admin login and logout
const initialStateAuth = {
  islogin: Cookies.get('login') ? Cookies.get('login') : null,
};

const authReducer = (state = initialStateAuth, action) => {
  switch (action.type) {
    case 'IS_LOGIN':
      return {
        ...state,
        islogin: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        islogin: action.payload,
      };
    default:
      return state;
  }
};

// ===================================================================
// VACCINE REDUCER

// reducer for maintain the Person and Vaccination details
const formikReinitialize = {
  id: '',
  fullName: '',
  phoneNumber: '',
  email: '',
  aadharNumber: '',
  gender: '',
  photo: '',
  bloodGroup: '',
  allergyCondition: '',
  antibodyInjection: '',
};
const initialStateVaccine = {
  initialValueFormik: formikReinitialize,
  personsList: [],
  vaccinesList: [],
};

const vaccineReducer = (state = initialStateVaccine, action) => {
  switch (action.type) {
    case 'GET_PERSONS_DATAS':
      return {
        ...state,
        personsList: action.payload,
      };
    case 'GET_PERSON_DETAIL_BY_ID':
      return {
        ...state,
        initialValueFormik: action.payload,
      };
    case 'GET_VACCINE_DETAIL':
      return {
        ...state,
        vaccinesList: action.payload,
      };
    case 'RESET_PERSON_DETAIL_BY_ID':
      return {
        ...state,
        initialValueFormik: formikReinitialize,
      };
    default:
      return state;
  }
};

export default combineReducers({
  vaccineReducer,
  commonReducer,
  authReducer,
});
