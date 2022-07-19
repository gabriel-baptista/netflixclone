import React, {useEffect, useState} from "react";
import './App.css'
import Tmbd from './tmdb';
import MovieRow from "./components/movieRow/MovieRow";
import Featuredmovie from "./components/featured/FeaturedMovie.js";
import Header from "./components/header/header.js";

export default() => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadALl = async () => {
      // pegando a lista TOTAL
      let list = await Tmbd.getHomeList();
      setMovieList(list)

      // pegando o filme em destaque (featured)
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmbd.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }
  
    loadALl();
  }, [])

  // monitora o scroll da tela e seta o blackHeader para true ou false dependendo da posição do scroll
  useEffect(() => {
    const scrollListener = () => {
      // se o scroll vertical for maior que 10px, seta o blackHeader para true
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])
  
  

  return (
    <div className="page">

      {/* header */}
      <Header black={blackHeader} />

      {/* filme em destaque */}
      { featuredData &&
        <Featuredmovie item={featuredData} />
      }

      {/* lista de filmes */}
      <section className="lists">
        {movieList.map((item, key)=> (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer> 
          Feito com <span role="img" aria-label="coração">❤️</span> por Gabriel Oliveira<br/>
          Direitos de imagem para Netflix<br/>
          Dados pegos do site Themoviedb.org
      </footer>
      
      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" />
        </div>
      }
    </div>
  )
}