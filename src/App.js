import React, { useRef, useEffect } from 'react';
import { useLocation , Switch} from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
import About from './components/about/about';
import Events from './components/Events/Events';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';
import Auth from './Auth/Auth';
import AuthCompany from './AuthCompany/AuthCompany';
import JobsList from './components/jobs/JobsList';
import Dashboard from './dashboard/Dashboard';
import CompDashboard from './CompanyDashboard/Dashboard';
import Price from './components/Price';

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AppRoute exact path="/about" component={About} layout={LayoutDefault} />
          <AppRoute exact path="/career" component={Events} layout={LayoutDefault} />
          <AppRoute exact path="/login" component={Auth} layout={LayoutDefault} />
          <AppRoute exact path="/companylogin" component={AuthCompany} layout={LayoutDefault} />
          <AppRoute exact path="/Jobs" component={JobsList}  />
          <AppRoute exact path="/dash" component={Dashboard}  />
          <AppRoute exact path="/Compdash" component={CompDashboard}  />
          <AppRoute exact path="/price" component={Price} layout={LayoutDefault} />
        </Switch>
      )} />
  );
}

export default App;