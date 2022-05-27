import requests from '../requests'
import requestsMock from '../requestsMoke'

const getThemHom  = () => requests.get('/home/themHome');
const getHomeBanner = () => requestsMock.get('/home/HomeBanaer');
const getHomeGoodShop = () => requestsMock.get('/home/HomeGoodShop');
const getHomeGuessLike = () => requestsMock.get('/home/HomeGussLike');

export { getThemHom, getHomeBanner, getHomeGoodShop, getHomeGuessLike }