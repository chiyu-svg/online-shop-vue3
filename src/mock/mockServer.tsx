import Mock from 'mockjs'
import HomeBanaer from './homeBanaer.json'
import GoodShop from './goodShop.json'
import GuessLike from './guessLike.json'

Mock.mock('/mock/home/HomeBanaer', 'get', { code: 200, data: HomeBanaer });
Mock.mock('/mock/home/HomeGoodShop', 'get', { code: 200, data: GoodShop });
Mock.mock('/mock/home/HomeGussLike', 'get', { code: 200, data: GuessLike });