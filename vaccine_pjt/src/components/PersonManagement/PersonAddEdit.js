import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import {
  setErrorMessage,
  registerPerson,
  getPersonDataById,
  editPersonData,
} from '../../actions';

// regular expression for phone number
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// regular expression for aadhar
const aadharRegExp = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;

const PersonAddEdit = () => {
  const { initialValueFormik, personsList } = useSelector(
    (state) => state.vaccineReducer
  );
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  // get id if it is edit mode
  const params = useParams();
  const dataId = params.id;

  useEffect(() => {
    if (dataId) {
      dispatch(getPersonDataById(dataId));
    }
  }, []);

  // image uploader
  const onDrop = (pictureFiles, pictureDataURLs) => {
    setImage(pictureDataURLs[0]);
  };

  // formik validation
  const validationYup = Yup.object({
    fullName: Yup.string().required('Required'),
    email: Yup.string().email().required('Require'),
    phoneNumber: Yup.string()
      .min(10, 'Must be 10 digit')
      .max(10, 'Must be 10 digit')
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Require'),
    aadharNumber: Yup.string()
      .max(12)
      .min(12)
      .matches(aadharRegExp, 'Aadhar number is not valid')
      .required('Require'),
    bloodGroup: Yup.string().required('Require'),
    gender: Yup.string().required('Require'),
    allergyCondition: Yup.string().required('Require'),
    antibodyInjection: Yup.string().required('Require'),
  });

  return (
    <div className="container-bg">
      <>
        <Formik
          initialValues={initialValueFormik}
          validationSchema={validationYup}
          onSubmit={(values, { resetForm }) => {
            if (dataId) {
              values = { ...values, image: image || initialValueFormik.image };
              dispatch(editPersonData(dataId, values));
              resetForm();
            } else if (
              personsList.filter(
                (item) => item.aadharNumber === values.aaadharNumber
              ).length > 0
            ) {
              return dispatch(
                setErrorMessage('This Aadhar number is already registered')
              );
            } else {
              values = {
                ...values,
                image: image,
              };
              dispatch(registerPerson(values));
              resetForm();
            }
          }}
          enableReinitialize
        >
          <Form>
            <div className="form-container">
              <h2 className="text-uppercase text-center mb-5">
                Person Registration
              </h2>

              {/* full name */}
              <div className="form-outline mb-4">
                <label>Full Name</label>
                <Field name="fullName" type="text" className="form-control " />
                <span className="text-danger">
                  <ErrorMessage name="fullName" />
                </span>
              </div>

              {/* phone number */}
              <div className="form-outline mb-4">
                <label>Phone Number</label>
                <Field
                  name="phoneNumber"
                  type="text"
                  className="form-control "
                />
                <span className="text-danger">
                  <ErrorMessage name="phoneNumber" />
                </span>
              </div>

              {/* email */}
              <div className="form-outline mb-4">
                <label>Email</label>
                <Field name="email" type="email" className="form-control " />
                <span className="text-danger">
                  <ErrorMessage name="email" />
                </span>
              </div>

              {/* aadhar */}
              <div className="form-outline mb-4">
                <label>Aadhar</label>
                <Field
                  name="aadharNumber"
                  type="text"
                  className="form-control "
                />
                <span className="text-danger">
                  <ErrorMessage name="aadharNumber" />
                </span>
              </div>

              {/* gender */}
              <div className="form-outline mb-4">
                <label className="me-5">Gender</label>
                <Field
                  type="radio"
                  name="gender"
                  value="Male"
                  className="form-check-input me-1"
                />
                Male
                <Field
                  type="radio"
                  name="gender"
                  value="Female"
                  className="form-check-input ms-4 me-1"
                />
                Female
                <span className="text-danger">
                  <ErrorMessage name="gender" />
                </span>
              </div>

              {/* image */}
              <div className="form-outline mb-4">
                {dataId ? (
                  <img src={initialValueFormik.image} width="200px" />
                ) : null}
                <div>
                  <label>Upload photo</label>
                  <ImageUploader
                    singleImage={true}
                    withPreview={true}
                    withIcon={true}
                    buttonText="Choose images"
                    onChange={onDrop}
                    imgExtension={['.jpeg', '.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={3242880}
                  />
                </div>
                <span className="text-danger">
                  <ErrorMessage name="photo" />
                </span>
              </div>

              {/* blood group */}
              <div className="form-outline mb-4">
                <label>Blood Group</label>
                <Field as="select" name="bloodGroup" className="form-select">
                  <option>Blood Group</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </Field>
                <span className="text-danger">
                  <ErrorMessage name="bloodGroup" />
                </span>
              </div>

              {/* allergy */}
              <div className="form-outline mb-4">
                <label>Is any allergy? If yes specify</label>
                <Field
                  name="allergyCondition"
                  as="textarea"
                  className="form-control "
                />
                <span className="text-danger">
                  <ErrorMessage name="allergyCondition" />
                </span>
              </div>

              {/* anti injection */}
              <div className="form-outline mb-4">
                <label>
                  Have you taken any antibody injections in the last 90 days?
                </label>
                <br />
                <Field
                  type="radio"
                  name="antibodyInjection"
                  value="Yes"
                  className="form-check-input me-1"
                />
                Yes
                <Field
                  type="radio"
                  name="antibodyInjection"
                  value="No"
                  className="form-check-input ms-4 me-1"
                />
                No
                <span className="text-danger">
                  <ErrorMessage name="antibodyInjection" />
                </span>
              </div>

              <div className="text-center">
                <button type="submit" className="btn button">
                  {dataId ? 'Update' : ' Add'}
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </>
    </div>
  );
};

export default PersonAddEdit;
