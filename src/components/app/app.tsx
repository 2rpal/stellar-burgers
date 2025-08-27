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

import '../../index.css';
import styles from './app.module.css';

import { Route, Routes } from 'react-router-dom';

import {
  AppHeader,
  Modal,
  OrderInfo,
  IngredientDetails,
  PrivateComponent
} from '@components';

const App = () => (
  <div className={styles.app}>
    <AppHeader />

    <Routes>
      {/* публичные страницы */}
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />

      {/* страницы авторизации (пока без гостевых гардов) */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />

      {/* «защищённые» разделы (сейчас PrivateComponent — заглушка) */}
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

      {/* МОДАЛЬНЫЕ МАРШРУТЫ */}
      <Route
        path='/feed/:number'
        element={
          <Modal title='Детали заказа' onClose={() => window.history.back()}>
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal
            title='Детали ингредиента'
            onClose={() => window.history.back()}
          >
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path='/profile/orders/:number'
        element={
          <PrivateComponent>
            <Modal title='Детали заказа' onClose={() => window.history.back()}>
              <OrderInfo />
            </Modal>
          </PrivateComponent>
        }
      />

      {/* 404 */}
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  </div>
);

export default App;
