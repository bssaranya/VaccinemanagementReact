import { getDataFromJson, setDataToJson, editDataInJson } from '../services';
import { encrypt, decrypt } from '../utils/PasswordEncryption';
import history from '../history';
import Cookies from 'js-cookie';

// ===================================================================
// COMMON ACTIONS

// toaster for success messsage
export const setSuccessMessage = (data) => (dispatch) => {
  dispatch({
    type: 'SUCCESS_MESSAGE',
    payload: data,
  });
};

// toaster for error message
export const setErrorMessage = (data) => (dispatch) => {
  dispatch({
    type: 'ERROR_MESSAGE',
    payload: data,
  });
};

// reset  success message toaster
export const resetSuccessMessage = () => (dispatch) => {
  dispatch({
    type: 'RESET_SUCCESS_MESSAGE',
  });
};

// reset error message toaster
export const resetErrorMessage = () => (dispatch) => {
  dispatch({
    type: 'RESET_SUCCESS_MESSAGE',
  });
};

// ===================================================================
// AUTHENTICATION ACTIONS

// action for login
export const islogin = (loginData) => async (dispatch) => {
  const { data } = await getDataFromJson('loginCredentials/');

  const decrypted = await decrypt(data.password);
  let payload;

  if (
    loginData.userName === data.userName &&
    loginData.password === decrypted
  ) {
    payload = true;
    Cookies.set('login', true);
  } else {
    payload = false;
  }
  dispatch({
    type: 'IS_LOGIN',
    payload,
  });
  if (payload === true) {
    return history.push('admin-dashboard/');
  } else {
    return dispatch(setErrorMessage('INVALID login credentials'));
  }
};

// action for logout admin
export const logout = () => (dispatch) => {
  Cookies.remove('login');
  dispatch({
    type: 'LOGOUT',
    payload: null,
  });
  history.push('/');
};

// action for password change
export const passwordChange = (details) => async (dispatch) => {
  const { data } = await getDataFromJson('/loginCredentials');
  const decrypted = await decrypt(data.password);
  if (details.newPswd === details.oldPswd) {
    return dispatch(setErrorMessage('Old Password and New Password are same'));
  }
  if (decrypted === details.oldPswd) {
    let encryptPswd = encrypt(details.newPswd);
    let userName = data.userName;
    const query = setDataToJson('/loginCredentials', {
      userName,
      password: encryptPswd,
    });
    dispatch(setSuccessMessage('Password Changed'));
    history.push('/admin-dashboard');
  } else {
    return dispatch(setErrorMessage('Current Password is wrong'));
  }
};

// ===================================================================
// VACCINATION ACTIONS

// register a person
export const registerPerson = (userData) => async (dispatch) => {
  const query = await setDataToJson('/personDetails', userData);
  dispatch(setSuccessMessage('Registered sucssfully'));
  history.push('/person-listing');
};

// get all registered users data
export const getUserData = () => async (dispatch) => {
  const data = await getDataFromJson('/personDetails');
  dispatch({
    type: 'GET_PERSONS_DATAS',
    payload: data.data,
  });
};

// get user data by id
export const getPersonDataById = (id) => async (dispatch) => {
  const data = await getDataFromJson(`/personDetails/${id}`);
  dispatch({
    type: 'GET_PERSON_DETAIL_BY_ID',
    payload: data.data,
  });
};

// edit the person data
export const editPersonData = (id, data) => async (dispatch) => {
  const query = await editDataInJson(`/personDetails/${id}`, data);
  dispatch(setSuccessMessage('Data Edited Sucessfully'));
  history.push('/person-listing');
};

// set the vaccination details
export const setVaccinationDetail = (data) => async (dispatch) => {
  const query = await setDataToJson('/vaccinationDetails', data);
  dispatch(setSuccessMessage('Vaccination Details added Sucessfully'));
  history.push('/vaccine-listing');
};

// get the vaccination details
export const getVaccinationDetail = () => async (dispatch) => {
  const data = await getDataFromJson(`/vaccinationDetails/`);
  dispatch({
    type: 'GET_VACCINE_DETAIL',
    payload: data.data,
  });
};

// update the vaccine data
export const editVaccineData = (id, data) => async (dispatch) => {
  const query = await editDataInJson(`/vaccinationDetails/${id}`, data);
  dispatch(setSuccessMessage('Data Edited Sucessfully'));
  history.push('/vaccine-listing');
};
