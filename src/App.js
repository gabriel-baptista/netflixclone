import React, {useEffect, useState} from "react";
import './App.css'
import Tmbd from './tmdb';
import MovieRow from "./components/MovieRow";
import Featuredmovie from "./components/FeaturedMovie.js";

export default() => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

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
  

  return (
    <div className="page">
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
    </div>
  )
}