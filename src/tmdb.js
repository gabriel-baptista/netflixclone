// nesse arquivo vai conter as requisoes da api para nao ter que fazer cada requisição no meio do
// codigo e assim poder fazer alterções de forma mais facil sem a aplicação quebrar

const API_KEY = "0915390a76341150dc3aaa911ed7c9e4";
const API_BASE = "https://api.themoviedb.org/3";

/*
    - originais netflix
    - recomendados
    - em alta
    - ação
    - comedia
    - romance
    - documentarios
*/

// faz a pesquisa dos filmes de acordo com a url informada na função getHomeList e transforma e json
const basicFetch = async (endpoint) => {
  // requisição para um serviço externo
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
};

// eslint-disable-next-line
export default {
  getHomeList: async () => {
    // retorna um array com os filmes de cada genero
    return [
      {
        slug: "originals",
        title: "Originais do Netflix",
        items: await basicFetch(
          `/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "trending",
        title: "Recomendados para Você",
        items: await basicFetch(`/trending/all/week?language-BR&api_key=${API_KEY}`),
      },
      {
        slug: "toprated",
        title: "Em Alta",
        items: await basicFetch(`/movie/top_rated?language-BR&api_key=${API_KEY}`),
      },
      {
        slug: "action",
        title: "Ação",
        items: await basicFetch(`/discover/movie?with_genres=28&language-BR&api_key=${API_KEY}`),
      },
      {
        slug: "comedy",
        title: "Comédia",
        items: await basicFetch(`/discover/movie?with_genres=35&language-BR&api_key=${API_KEY}`),
      },
      {
        slug: "horror",
        title: "Terror",
        items: await basicFetch(`/discover/movie?with_genres=27&language-BR&api_key=${API_KEY}`),
      },
      {
        slug: "romance",
        title: "Romance",
        items: await basicFetch(`/discover/movie?with_genres=10749&language-BR&api_key=${API_KEY}`),
      },
      {
        slug: "documentary",
        title: "Documentário",
        items: await basicFetch(`/discover/movie?with_genres=99&language-BR&api_key=${API_KEY}`),
      },
    ];
  },

  // pegando informaçoes do filme
  getMovieInfo: async(movieId, type) => {
    let info = {}

    if(movieId){
      switch(type){
        case 'movie':
          info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
        break;
        case 'tv':
          info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
        break;
        default: 
          info = null;
        break;
      }
    }

    return info;
  }
};
