import requestOut from '../requestOut'

const getSearchData = (params: {[key: string]: any}) => requestOut.post('/list', params)

export { getSearchData }