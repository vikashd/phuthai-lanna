import { UberEatsColorHoriz } from '../svg'
import {
  FoodDeliveryOptions,
  FooterDeliveryLinkDeliverEasy,
  FooterDeliveryLinkFoodNinja,
  FooterDeliveryLinkDeliverUberEats,
  Heading,
} from './delivery.style'

const Delivery = () => (
  <>
    <Heading>Get your food delivered fast through our partners</Heading>
    <FoodDeliveryOptions>
      <FooterDeliveryLinkDeliverUberEats
        href="https://www.ubereats.com/nz/wellington/food-delivery/phuthai-lanna-restaurant/zdfiewasTKGis_qTnuDVrg"
        target="_blank"
        rel="noreferrer noopener"
        title="Uber Eats"
      >
        <UberEatsColorHoriz />
      </FooterDeliveryLinkDeliverUberEats>
      <FooterDeliveryLinkDeliverEasy
        href="https://www.delivereasy.co.nz/phu-thai-lanna-wellington-delivery"
        target="_blank"
        rel="noreferrer noopener"
        title="Deliver Easy"
      >
        <img src="../img/logo-deliver-easy.png" alt="Deliver Easy" />
      </FooterDeliveryLinkDeliverEasy>
      <FooterDeliveryLinkFoodNinja
        href="https://www.foodninja.nz"
        target="_blank"
        rel="noreferrer noopener"
        title="Food Ninja"
      >
        <img src="../img/logo-food-ninja.png" alt="Food Ninja" />
      </FooterDeliveryLinkFoodNinja>
    </FoodDeliveryOptions>
  </>
)

export default Delivery
