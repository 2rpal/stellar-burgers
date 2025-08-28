import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import {
  fetchOrderByNumber,
  selectOrderDetails
} from '../../services/slices/orderDetailsSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (number) dispatch(fetchOrderByNumber(Number(number)));
  }, [dispatch, number]);

  const orderData = useSelector(selectOrderDetails);
  const ingredients: TIngredient[] = useSelector(selectIngredients);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;
    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, id) => {
        if (!acc[id]) {
          const ingredient = ingredients.find((ing) => ing._id === id);
          if (ingredient) acc[id] = { ...ingredient, count: 1 };
        } else {
          acc[id].count++;
        }
        return acc;
      },
      {} as TIngredientsWithCount
    );

    const total = Object.values(ingredientsInfo).reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    return { ...orderData, ingredientsInfo, date, total };
  }, [orderData, ingredients]);

  if (!orderInfo) return <Preloader />;
  return <OrderInfoUI orderInfo={orderInfo} />;
};
