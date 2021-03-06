import axios from 'axios'

//const API_ENDPOINT = '/search'

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
  
export const createUser = (params) => {
  return axios.post(`http://localhost:2000/inscription`,params);
}

export const connectUser = (params) => {
  return axios.post(`http://localhost:2000/connexion`,params);
}

export const searchUtilisateur = (IDUtilisateur) => {
  return axios.get(`http://localhost:2000/search/utilisateur`, {params:{IDUtilisateur: IDUtilisateur}});
}

export const searchDetail = (IDAnnonce) => {
  return axios.get(`http://localhost:2000/search/detail`, {params:{IDAnnonce: IDAnnonce}});
}

export const enchereUser = (IDUtilisateur, Enchere, IDAnnonce) => {
  return axios.get(`http://localhost:2000/encherir`,{params:{IDUtilisateur: IDUtilisateur, Enchere: Enchere, IDAnnonce: IDAnnonce}});
}

export const achImUser = (IDUtilisateur, IDAnnonce) => {
  return axios.get(`http://localhost:2000/achim`,{params:{IDUtilisateur: IDUtilisateur, IDAnnonce: IDAnnonce}});
}

export const posterAnnonce = (params) => {
  return axios.post(`http://localhost:2000/poster`,params);
}

export const historique = (IDUtilisateur) => {
  return axios.get(`http://localhost:2000/historique`,{params:{IDUtilisateur: IDUtilisateur}});
}

export const searchUtilisateurs = (IDUtilisateur) => {
  return axios.get(`http://localhost:2000/search/utilisateurs`, {params:{IDUtilisateur: IDUtilisateur}});
}

export const deleteCategorie = (Nom, IDCategorie) => {
  return axios.get(`http://localhost:2000/delete/categorie`, {params:{Nom: Nom, IDCategorie: IDCategorie }});
}

export const createCategorie = (params) => {
  return axios.post(`http://localhost:2000/createcate`,params);
}

export const deleteUtilisateur = (IDUtilisateur) => {
  return axios.get(`http://localhost:2000/delete/user`, {params:{IDUtilisateur: IDUtilisateur }});
}

export const deleteAnnonce = (Annonce) => {
  return axios.get(`http://localhost:2000/delete/annonce`, {params:{Annonce: Annonce}});
}

export const searchExpirees = () => {
  return axios.get(`http://localhost:2000/search/annonces/expirees`);
}

export const searchSuggestions= (IDs) => {
  return axios.get(`http://localhost:2000/search/annonces/suggestions`, {params:{IDs: IDs}});
}