import axios from 'axios'

const API_ENDPOINT = '/search'

export const searchAnnonce = () => {
    return axios.get(`http://localhost:2000/search/annonces`);
  }

export const searchAnnonceCate = (IDCategorie) => {
    return axios.get(`http://localhost:2000/search/annonces/categorie`, {params:{IDCate: IDCategorie}});
  }

export const searchAnnonceRech = (Recherche) => {
    return axios.get(`http://localhost:2000/search/annonces/recherche`, {params:{Texte: Recherche}});
  }

export const searchAnnonceRechCate = (Recherche, IDCategorie) => {
    return axios.get(`http://localhost:2000/search/annonces/rechcate`, {params:{Texte: Recherche, IDCate: IDCategorie}});
  }

export const searchCategories = () => {
    return axios.get(`http://localhost:2000/search/categories`);
  }