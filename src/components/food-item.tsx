import {
  FoodDescription,
  FoodHeading,
  FoodItem,
  FoodPrice,
} from './food-item.style'

export interface Dish {
  name: string
  description?: string
  price: number
}

const FoodItemComponent: React.FC<Dish> = ({ description, name, price }) => (
  <FoodItem>
    <FoodHeading>{name}</FoodHeading>
    <FoodDescription>{description}</FoodDescription>
    <FoodPrice>{`$${parseFloat(String(price)).toFixed(2)}`}</FoodPrice>
  </FoodItem>
)

export default FoodItemComponent
