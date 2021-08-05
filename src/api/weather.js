import request from '../utils/request'

// 天气
export const getWeather = () => {
  return request({
    method: 'GET',
    // 这里先写死
    url: `https://restapi.amap.com/v3/weather/weatherInfo?city=310000&key=ab27cf4e30e1a4eef844ddeea83c2f99`,
  })
}
