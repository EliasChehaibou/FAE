import axios from 'axios'

const API_ENDPOINT = '/search'

export const searchAnnonce = () => {
    return axios.get(`http://localhost:2000/search/annonces`);
  }

  export const searchCategories = () => {
    return axios.get(`http://localhost:2000/search/categories`);
  }