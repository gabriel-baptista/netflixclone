import React, {useState} from "react";
import './MovieRow.css'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const MovieRow =  ({title, items}) => {

    // tratando como vai funcionar o botao de back e next nas listas de filmes
    const [scrollX, setScrollX] = useState(-400);

    const handleLeftArea = () => {
        // window.innerWidth pega o tamanho da tela do usuario
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x > 0){
            x = 0;
        }
        setScrollX(x);
    }

    const handleRightArea = () =>{
        // window.innerWidth pega o tamanho da tela do usuario
        let x = scrollX - Math.round(window.innerWidth / 2);
        // pega o tamanho da lista de filmes e multiplica pelo tamanho de cada card de filme
        let listWidth = items.results.length * 150;
        if ((window.innerWidth - listWidth) > x ) {
            // x recebe o tamanho da tela - tamanho total da lista - o tamanho do padding
            x = (window.innerWidth - listWidth) -60;
        }
        setScrollX(x);
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            
            <div className="movieRow--left" onClick={handleLeftArea}>
                <NavigateBeforeIcon style={{fontSize: 50}} />
            </div>

            <div className="movieRow--right" onClick={handleRightArea}>
                <NavigateNextIcon style={{fontSize: 50}} />
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                        marginLeft: scrollX,
                        width: items.results.length * 150,
                    }}>
                    {items.results.length > 0 && items.results.map((item, key)=>(
                        <div key={key} className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={item.original_title} />    
                        </div>
                    ))} 
                </div>
            </div>
        </div>
    );
}

export default MovieRow;