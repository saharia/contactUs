import FuseLoading from '@fuse/core/FuseLoading';
import FuseUtils from '@fuse/utils';
import settingsConfig from 'app/configs/settingsConfig';
import { Navigate } from 'react-router-dom';
import appsConfigs from '../main/apps/appsConfigs';
import authRoleExamplesConfigs from '../main/auth/authRoleExamplesConfigs';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';

const routeConfigs = [
  ...appsConfigs,
  ...authRoleExamplesConfigs,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="apps/contact-us" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '*',
    element: <Navigate to="pages/error/404" />,
  },
];

export default routes;
