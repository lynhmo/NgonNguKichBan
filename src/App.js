import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
// import axios from 'axios'
// import { useQuery } from '@tanstack/react-query'
import { isJsonString } from './utils';
import { jwtDecode } from "jwt-decode";
import * as UserService from './services/UserService'
import { useDispatch } from 'react-redux'
import { updateUser } from './redux/slides/userSlide';

function App() {
  useEffect(() => {
    const { stogareData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, stogareData)
    }
  })

  const handleDecoded = () => {
    let stogareData = localStorage.getItem('access_token')
    let decoded = {}
    if (stogareData && isJsonString(stogareData)) {
      stogareData = JSON.parse(stogareData)
      decoded = jwtDecode(stogareData);
    }
    return { decoded, stogareData }
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date();
    const { decoded } = handleDecoded();
    if (decoded?.exp < (currentTime.getTime() / 1000)) {
      const data = await UserService.refreshToken();
      config.headers['token'] = `Beare ${data?.access_token}`;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  const handleGetDetailUser = async (id, token) => {
    try {
      const res = await UserService.getDetailUser(id, token)
      dispatch(updateUser({ ...res?.data, access_token: token }))
    } catch (error) {
      console.log('ERROR: ', error);
    }

  }
  const dispatch = useDispatch()

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            // const Layout = route.isShowHeader && DefaultComponent
            // Header and footer
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
