import axios from 'axios'
const API_KEY="85b4249680261eee47017d3f361816cf"

export const getCountryApi=(countryName)=>{
    return axios({
        method:"GET",
        url:`https://restcountries.eu/rest/v2/name/${countryName}`
        })
}

export const weatherApi=(capital)=>{
    return axios({
        method:"GET",
        url:`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`
        })
}