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
    const res = await fetch(API_URL + '/trending/movie/day'  +'?api_key=' + API_KEY + '&language=es')
    const data = await res.json();
    trendinMoviesListContainer.innerHTML = ''
    const pelis = data.results;
    const mainArticle = document.querySelector('#trending .trending-movieList')

    createMovies(pelis, mainArticle)
    
}
async function getGenrePreview(){
    const {data} = await api('/genre/movie/list' )
    const genres = data.genres;    
    const mainContainer = document.querySelector('#genre .genre-list')
    categoriesListContainer.innerHTML = ''    

    createCategories(genres, mainContainer)
    
}

async function getMoviesByGenre(id){
    const {data} = await api('/discover/movie', {
        params: {
            with_genres : id}
        })
    const pelisbyGenre = data.results;
    genericSection.innerHTML = '';
   
   createMovies(pelisbyGenre, genericSection)
    
}

async function getMoviesBySearch(query){
    const {data} = await api('/search/movie', {
        params: {
            query : query} //la api requiere enviarle un parametro llamado query con lo q el usuario desea buscar
        })

    const pelisbySearch = data.results;
    genericSection.innerHTML = '';
   
   createMovies(pelisbySearch, genericSection)
    
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
async function getTrendingMovies(){
    const {data} = await api('/trending/movie/day')    
    headerTitle.innerHTML = 'Top 20 Peliculas mejores peliculas de la Semana'
    const pelis = data.results;
    genericSection.innerHTML = ''

    createMovies(pelis, genericSection)
    
}
async function getTrendingSeries(){
    const {data} = await api('/trending/tv/day')    
    headerTitle.innerHTML = 'Top 20 mejores series del Año'
    const serie = data.results;
    genericSection.innerHTML = ''

    createMovies(serie, genericSection)
    
}
function createMovies(movies, container){

    movies.forEach(movie => {
        const mainArticle = document.querySelector('#trending .trending-movieList')
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')
        const img = document.createElement('img')
        img.classList.add('movie-img')
        img.setAttribute('src', IMG_BASE + movie.poster_path)
        img.setAttribute('alt', movie.title)
        movieContainer.appendChild(img)
        container.appendChild(movieContainer)
    })
       
}
function createCategories(gen, container){
    gen.forEach(genre => {
        
        
        const genreContainer = document.createElement('div')
        genreContainer.classList.add('genre-container')
        const h3 = document.createElement('h3')
        h3.classList.add('genre-title')
        h3.setAttribute('id','id' + genre.id)
        h3.addEventListener('click', ()=>{location.hash = `#category=${genre.id}-${genre.name}`})
        const nombre = document.createTextNode(genre.name)
        h3.appendChild(nombre)

        genreContainer.appendChild(h3)
        container.appendChild(genreContainer)

    });
}