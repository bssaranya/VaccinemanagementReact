import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const VaccineFilter = ({ filterSearch }) => {
  // regular expression for aadharNumber
  const aadharRegExp = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;

  return (
    <div>
      <Formik
        initialValues={{ aadharNumber: '' }}
        validationSchema={Yup.object({
          aadharNumber: Yup.string()
            .max(12)
            .min(12)
            .matches(aadharRegExp, 'Aadhar number is not valid')
            .required('Require'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          filterSearch(values.aadharNumber);
        }}
      >
        <Form>
          <div className="input-group mb-3">
            <Field
              name="aadharNumber"
              type="text"
              className="form-control"
              placeholder="Enter the Aadhar Number that registered"
            />
            <button type="submit" className="btn btn-outline-secondary">
              Search
            </button>
          </div>
          <span className="text-danger">
            <ErrorMessage name="aadharNumber" />
          </span>
        </Form>
      </Formik>
    </div>
  );
};

export default VaccineFilter;
