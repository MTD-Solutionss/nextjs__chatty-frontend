import { useRoutes } from 'react-router';
import { AuthTabs, ForgotPassword, ResetPassword } from '@pages/auth';
import { ROUTES } from '@constants/index';

const AppRouter = () => {
  const elements = useRoutes([
    { path: ROUTES.LOGIN, element: <AuthTabs /> },
    { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPassword /> },
    { path: ROUTES.RESET_PASSWORD, element: <ResetPassword /> }
  ]);
  return elements;
};
export default AppRouter;
