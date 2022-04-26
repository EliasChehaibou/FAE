import axios from 'axios'

const API_ENDPOINT = '/annonces'

export const searchAnnonce = () => {
    return axios.get(`http://localhost:2000/annonces/search`);
  }