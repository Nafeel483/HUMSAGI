import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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

function Login() {
  let history = useHistory();
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userNameHandled = (e) => {
    setEmail(e.target.value)
  }
  const passwordHandled = (e) => {
    setPassword(e.target.value)
  }
  const submitLogin = () => {
    if (email == '') {
      alert('Email Is Required')
    }
    else if (password == '') {
      alert('Password Is Required')
    }
    else if (reg.test(email) === false) {
      alert("Email is Not Valid")
    }
    else {
      let data = {
        email: email,
        password: password,
      }

      axios
        .post(`https://admissionportalapp.herokuapp.com/user/login`, data)
        .then(response => {
          console.log("The Response is: ", response)
          if (response.status == 201) {
            alert("Login Successfully")
            history.push({
              pathname: '/',
            });
          }
        })
        .catch(error => {
          alert("Invalid Credentials")
          console.log(error)

        });
    }
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText >
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Email" autoComplete="email"
                        onChange={userNameHandled}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password"
                        onChange={passwordHandled}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4"
                          onClick={submitLogin}
                        >Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>

                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
