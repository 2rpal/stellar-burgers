import {
  useLocation,
  useNavigate,
  Routes,
  Route,
  Location
} from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import {
  AppHeader,
  Modal,
  OrderInfo,
  IngredientDetails,
  PrivateComponent
} from '@components';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { background?: Location } | undefined;
  const background = state?.background;

  const closeModal = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        <Route
          path='/profile'
          element={
            <PrivateComponent>
              <Profile />
            </PrivateComponent>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <PrivateComponent>
              <ProfileOrders />
            </PrivateComponent>
          }
        />

        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <PrivateComponent>
              <OrderInfo />
            </PrivateComponent>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <PrivateComponent>
                <Modal title='Детали заказа' onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              </PrivateComponent>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
