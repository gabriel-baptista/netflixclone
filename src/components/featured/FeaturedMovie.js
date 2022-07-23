import React from "react";
import './FeaturedMovie.css'

const FeaturedMovie = ({item}) => {

    let firstDate = new Date(item.first_air_date);
    let genres = [];
    for(let i in item.genres){
        genres.push(item.genres[i].name);
    }

    // cortando o tamanho da descrição do filme se tiver mais de 200 caracteres
    let description = item.overview;
    if(description.length > 200){
        description = description.substring(0, 200)+'...';
    }

    return (
        <section className="featured" style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop_path})`
            }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.original_name}</div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        {/* pega o numero de temporadas e faz uma condicional para o 's' aparecer se tiver mais de uma temporada  */}
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="featured--description">{description}</div>
                    <div className="featured--buttons">
                        <a className="featured--watchbutton" href={`/watch/${item.id}`}>► Assistir</a>
                        <a className="featured--mylistbutton" href={`/list/${item.id}`}>+ Minha Lista</a>
                    </div>
                    <div className="featured--genres"><strong>Gêneros:</strong> {genres.join(', ')}</div>
                </div>
            </div>
        </section>
    );
}

export default FeaturedMovie;