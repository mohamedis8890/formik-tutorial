import React from "react";
import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

import "./styles.css";

function App({ values, errors, touched, isSubmitting }) {
  return (
    <Form>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="password" />
      </div>
      <div>
        <label>
          <Field
            type="checkbox"
            name="newsletter"
            checked={values.newsletter}
          />
          Join Our Newsletter
        </label>
      </div>
      <div>
        <Field component="select" name="plan">
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </Field>
      </div>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
}

const FormikApp = withFormik({
  mapPropsToValues({ email, password, newsletter, plan }) {
    return {
      email: email || "",
      password: password || "",
      newsletter: newsletter || true,
      plan: plan || "premium"
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Please provide a better email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "At least 6 characters required")
      .required("Password is required")
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.email === "mo@test.io") {
        setErrors({ email: "This email is taken" });
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 2000);
    console.log(values);
  }
})(App);

const rootElement = document.getElementById("root");
ReactDOM.render(<FormikApp email="mo@test.io" />, rootElement);
