import { FC, memo, useCallback } from 'react';
import { useDispatch } from '../../services/store';
import { moveIngredient } from '../../services/slices/constructorSlice';
import { BurgerConstructorElementUI } from '../../components/ui/burger-constructor-element';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems, onRemove }) => {
    const dispatch = useDispatch();

    const handleMoveUp = useCallback(() => {
      if (index <= 0) return;
      dispatch(moveIngredient({ fromIndex: index, toIndex: index - 1 }));
    }, [dispatch, index]);

    const handleMoveDown = useCallback(() => {
      if (index >= totalItems - 1) return;
      dispatch(moveIngredient({ fromIndex: index, toIndex: index + 1 }));
    }, [dispatch, index, totalItems]);

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={onRemove}
      />
    );
  }
);
