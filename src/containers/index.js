import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Storage } from '../services';
import { Header, Footer } from '../components';
import AppRoutes from './appRoutes';
import {  ROUTES_NAMES } from '../constants';
import {
  setAsLoggedIn
} from '../store/actions/auth';
import ScrollToTop from '../components/Common/scrollToTop';

const AppContainer = () => {
  const location = useLocation();
  const authRoutes = [ROUTES_NAMES.login, ROUTES_NAMES.verification, ROUTES_NAMES.resetPass, ROUTES_NAMES.resetPassDone];
  const mapRoutes = [];

  const [isAppLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    loadLoginInfo();
  }, []);

  const loadSettings = async () => {
  };

  const loadLoginInfo = async () => {
    try {
      let token = Storage.getAppToken();
      if (token) {
        console.log('app token ', token);
        if (!token.startsWith('Bearer')) {
          token = `Bearer ${token}`;
        }
      }
      // eslint-disable-next-line no-empty
    } catch (e) {
    }

    try {
      await loadSettings();
      // eslint-disable-next-line no-empty
    } catch (error) {
    }
    setAppLoaded(true);
  };

  console.log(isAppLoaded)
  return (
    <>
      <ScrollToTop />
      {!authRoutes.includes(location.pathname) && (
        <Header/>
      )}
      <AppRoutes/>
      {!authRoutes.includes(location.pathname) && !mapRoutes.includes(location.pathname) && (
        <Footer/>
      )}
    </>
  );
};

AppContainer.propTypes = {
  isLoggedIn: PropTypes.bool,
};

const mapStateToProps = ({ app }) => ({
  isLoggedIn: app.isLoggedIn,
});

export default connect(mapStateToProps, {
  setAsLoggedIn,
})(AppContainer);
