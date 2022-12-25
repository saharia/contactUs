import { lazy } from 'react';
import ContactUsApp from './ContactUsApp';

const ContactUsForm = lazy(() => import('./contact/Form'));


const ContactUsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/contact-us',
      element: <ContactUsApp />,
      children: [
        {
          path: '',
          element: <ContactUsForm />,
        },
      ],
    },
  ],
};

export default ContactUsAppConfig;
