import requestOut from '../requestOut'

const getShopDetail = (skuId: number) => requestOut.get(`/item/${skuId}`);
const addToShopCar = (skuId: number, skuNumber: number) => requestOut.post(`/cart/addToCart/${skuId}/${skuNumber}`);

export { getShopDetail, addToShopCar }