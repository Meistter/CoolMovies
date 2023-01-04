const API_URL = 'https://api.themoviedb.org/3'
const IMG_BASE = 'https://image.tmdb.org/t/p/w300' //300px ancho

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params:{
        'api_key': API_KEY,
        'language': 'es'  //para que las categorias lleguen en español
    }
})

// En esta funcion NO usaremos Axios para guardarlo como ejemplo usando solo FETCH
async function getTrendingPreview(){
    const res = await fetch(API_URL + '/trending/movie/week' +'?api_key=' + API_KEY)
    const data = await res.json();
    trendinMoviesListContainer.innerHTML = ''
    const pelis = data.results;
   
    pelis.forEach(movie => {
        const mainArticle = document.querySelector('#trending .trending-movieList')
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')
        const img = document.createElement('img')
        img.classList.add('movie-img')
        img.setAttribute('src', IMG_BASE + movie.poster_path)
        img.setAttribute('alt', movie.title)
        movieContainer.appendChild(img)
        mainArticle.appendChild(movieContainer)
        
       
    });
}


async function getTrendingSeriesPreview(){
    const {data} = await api('/trending/tv/day')
    seriesListContainer.innerHTML = ''

    const series = data.results;

    series.forEach(serie => {
        const mainArticle = document.querySelector('#trendingSeries .trendingSeries-movieList')
        const serieContainer = document.createElement('div')
        serieContainer.classList.add('serie-container')
        const img = document.createElement('img')
        img.classList.add('serie-img')
        img.setAttribute('src', IMG_BASE + serie.poster_path)
        img.setAttribute('alt', serie.title)
        serieContainer.appendChild(img)
        mainArticle.appendChild(serieContainer)

    });
}

async function getGenrePreview(){
    const {data} = await api('/genre/movie/list' )
    const genres = data.genres;    

    categoriesListContainer.innerHTML = ''    


    genres.forEach(genre => {
        
        const mainContainer = document.querySelector('#genre .genre-list')
        const genreContainer = document.createElement('div')
        genreContainer.classList.add('genre-container')
        const h3 = document.createElement('h3')
        h3.classList.add('genre-title')
        h3.setAttribute('id','id' + genre.id)
        h3.addEventListener('click', ()=>{location.hash = `#category=${genre.id}-${genre.name}`})
        const nombre = document.createTextNode(genre.name)
        h3.appendChild(nombre)

        genreContainer.appendChild(h3)
        mainContainer.appendChild(genreContainer)

    });
}

async function getMoviesByGenre(id){
    const {data} = await    ('/discover/movie', {
        params: {
            with_genres : id}
        })
    const pelisbyGenre = data.results;
    genericSection.innerHTML = ''
    
   
    pelisbyGenre.forEach(movie => {

        // Minuto 16:25 falta iterar para mostrar el listado de peliculas
        const mainArticle = document.querySelector('#trending .trending-movieList')
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')
        const img = document.createElement('img')
        img.classList.add('movie-img')
        img.setAttribute('src', IMG_BASE + movie.poster_path)
        img.setAttribute('alt', movie.title)
        movieContainer.appendChild(img)
        mainArticle.appendChild(movieContainer)
        
       
    });
}