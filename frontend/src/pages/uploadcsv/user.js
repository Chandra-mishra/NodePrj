import React from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
const axios = require("axios");

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      type:""
    };
  }
  async submitUserForm(values, actions) {
    actions.setSubmitting(false);
    const formData = new FormData();
      formData.append("user", values.user);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
      axios
        .post("http://localhost:3001/user", formData, config)
        .then(res => {
          alert("successfully uploaded")
        })
        .catch(err => {
          alert("Oops, something went wrong")
        });
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/userlist" />;
    }
    return (
      <Formik
        validationSchema={this.schema}
        initialValues={this.state}
        enableReinitialize={true}
        onSubmit={this.submitUserForm.bind(this)}
        render={({
          values,
          errors,
          status,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue
        }) => (

        <div>
            <form onSubmit = {handleSubmit}>
                <label>Choose Csv Type</label>
                <select name="type" onChange={handleChange} onBlur={handleBlur} value={values.type} >
                <option value='' defaultValue disabled>select type</option>
                <option value="user_detail">User Detail</option>
                <option value="job_title">Job Title</option>
                </select>
                <input type="file"  name="user"  onChange={event => {setFieldValue("user", event.currentTarget.files[0])}} />
                <input type="submit" value="Submit" />
            </form>
        </div>
        )}
      />
    );
  }
}