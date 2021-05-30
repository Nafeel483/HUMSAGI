import React, { useState, useEffect } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios';


function Register() {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const userNameHandled = (e) => {
    setEmail(e.target.value)
  }
  const passwordHandled = (e) => {
    setPassword(e.target.value)
  }
  const confirmpasswordHandled = (e) => {
    setConfirmPassword(e.target.value)
  }
  const firstNameHandle = (e) => {
    setFirstName(e.target.value)
  }
  const lastNameHandle = (e) => {
    setLastName(e.target.value)
  }
  const submitRegister = () => {
    if (firstName == '') {
      alert("First Name is Required")
    }
    else if (lastName == '') {
      alert("Last Name is Required")

    }
    else if (email == '') {
      alert("Email is Required")
    }
    else if (reg.test(email) === false) {
      alert("Email is Not Valid")
    }
    else if (password == '') {
      alert("Password is Required")

    }
    else if (confirmPassword == '') {
      alert("Confirm Password is Required")

    }
    else if (password != confirmPassword) {
      alert("Password is not Matched")

    }
    else {
      let data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }
      axios
        .post(`https://admissionportalapp.herokuapp.com/user/register`, data)
        .then(response => {
          console.log("The Response is: ", response)
          if (response.status == 201) {
            alert("User SucessFully Registered")
            history.push({
              pathname: '/login',
            });
          }
        })
        .catch(error => {
          console.log('error', error)
          alert("Email already registered!")

        });
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="First Name" autoComplete="firstName"
                      onChange={firstNameHandle}

                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Last Name" autoComplete="lastName"
                      onChange={lastNameHandle}

                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Email" autoComplete="email"
                      onChange={userNameHandled}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" autoComplete="new-password"
                      onChange={passwordHandled}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Repeat password" autoComplete="new-password"
                      onChange={confirmpasswordHandled}
                    />
                  </CInputGroup>
                  <CButton color="success" block
                    onClick={submitRegister}
                  >Create Account</CButton>
                </CForm>
              </CCardBody>
              {/* <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                  </CCol>
                </CRow>
              </CCardFooter> */}
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
