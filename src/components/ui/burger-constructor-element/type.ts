import { TConstructorIngredient } from '@utils-types';

export type BurgerConstructorElementProps = {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
  onRemove?: () => void;
};

export type BurgerConstructorElementUIProps = {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  handleClose?: () => void;
};
