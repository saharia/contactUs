import withReducer from 'app/store/withReducer';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import reducer from './store';

function ContactUsApp() {
  const dispatch = useDispatch();

  return <Outlet />;
}

export default withReducer('contactUsApp', reducer)(ContactUsApp);
