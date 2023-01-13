const API_URL = 'https://api.themoviedb.org/3'
const IMG_BASE = 'https://image.tmdb.org/t/p/w300' //300px ancho

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params:{
        'api_key': API_KEY,
        'language': 'es' //para que la informacion de la api llegue en español
       
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
    console.log(data.total_pages);

    maxPage = data.total_pages;
    const pelisbyGenre = data.results;
    genericSection.innerHTML = '';
    headerSection.style.background = ''
   
   createMovies(pelisbyGenre, genericSection)
    
}
async function getMoviesBySearch(query){
    const {data} = await api('/search/movie', {
        params: {
            query : query} //la api requiere enviarle un parametro llamado query con lo q el usuario desea buscar
        })
    maxPage = data.total_pages;
    const pelisbySearch = data.results;
    genericSection.innerHTML = '';
    headerSection.style.background = ''
   
   createMovies(pelisbySearch, genericSection)
    
}
async function getTrendingSeriesPreview(){
    const {data} = await api('/trending/tv/day')
    seriesListContainer.innerHTML = ''
    headerSection.style.background = ''
    const series = data.results;
    const mainArticle = document.querySelector('#trendingSeries .trendingSeries-movieList')
    createSeries(series, mainArticle)
    
}
let maxPage;
let page = 1;
let infiniteScroll //esta variable nos permitira diferenciar a que pagina hacer scroll infinito
// window.addEventListener('scroll', infiniteScroll) //aqui escuchamos cualquier scroll en la aplicacion y llamamos a la funcion paginated, la funcion internamente compara el scroll y si se cumple pagina, si no, no hace nada. Este llamado lo movimos a navigation.js

async function getPaginatedTrendingMovies(){
     //logica para scroll infinito, aqui compararemos si esta al final del scroll y en caso de estarlo ejecuta el llamado a la pagina dos
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement
    const pageIsNotMax = page < maxPage; //esta variable la usamos para verificar que no lleguemos a la ultima pagina existente en la api, para no cargar mas de las paginas existentes en la api lo cual daria error

    if ((( scrollTop + clientHeight) >= (scrollHeight - 15)) && pageIsNotMax){ //esta es la validacion para saber si la persona llego al final del scroll de la pagina, la comparacion de estos valores nos da como resultado si esta o no al final, cada dato representa un numero
    
        page++;
    const {data} = await api('/trending/movie/day',{
        params: {
            page
        }
    })    
    const pelis = data.results;
    createMovies(pelis, genericSection)
    }

}
async function getPaginatedTrendingSeries(){
    //logica para scroll infinito, aqui compararemos si esta al final del scroll y en caso de estarlo ejecuta el llamado a la pagina dos
   const { scrollTop, scrollHeight, clientHeight} = document.documentElement
   const pageIsNotMax = page < maxPage;
   if ((( scrollTop + clientHeight) >= (scrollHeight - 15)) && pageIsNotMax){ //esta es la validacion para saber si la persona llego al final del scroll de la pagina, la comparacion de estos valores nos da como resultado si esta o no al final, cada dato representa un numero
   
       page++;
   const {data} = await api('/trending/tv/day',{
       params: {
           page
       }
   })    
   const series = data.results;
   createSeries(series, genericSection)
   }

}
 function getPaginatedMoviesBySearch(query){   
  return async function(){
            const { scrollTop, scrollHeight, clientHeight} = document.documentElement

            const pageIsNotMax = page < maxPage;
    
            if ((( scrollTop + clientHeight) >= (scrollHeight - 15)) && pageIsNotMax){ 
                // const [_, query] = location.hash.split("="); aqui en lugar de sacar el id vamos a hacerlo con closures
                console.log(query);
                page++;
                const {data} = await api('/search/movie', {
                    params: {
                        page,
                        query : query} 
                    })

                const pelisbySearch = data.results;
                
            
            createMovies(pelisbySearch, genericSection)
                }
            }
}
async function getPaginatedGenregMovies(){
   
   const { scrollTop, scrollHeight, clientHeight} = document.documentElement
   const pageIsNotMax = page < maxPage; 

   if ((( scrollTop + clientHeight) >= (scrollHeight - 15)) && pageIsNotMax){ 
    const [_, id1, urlName] = location.hash.split("="); //aqui sacamos el id de la categoria directamente de la url ya que ya nos encontramos dentro de la categoria que queremos
    const [id, x] = id1.split("-"); 
   
       page++;
       const {data} = await api('/discover/movie', {
        params: {
            with_genres : id,
            page}
        })
    const pelisbyGenre = data.results;
    
   
    createMovies(pelisbyGenre, genericSection)
    }
}   
async function getTrendingMovies(){
    const {data} = await api('/trending/movie/day')    
    const pelis = data.results;
    maxPage = data.total_pages;

    headerTitle.innerHTML = 'Top 20 mejores peliculas de la Semana'
    headerSection.style.background = ''
    genericSection.innerHTML = ''
    headerSection.style.background = ''
        
    createMovies(pelis, genericSection)

   
  
    
}
async function getTrendingSeries(){
    console.log(infiniteScroll);
    const {data} = await api('/trending/tv/day')    
    headerTitle.innerHTML = 'Top 20 mejores series del Año'
    headerSection.style.background = ''
    const series = data.results;
    genericSection.innerHTML = ''
    maxPage = data.total_pages;    
    series.forEach(serie => {
        
        const movieContainer = document.createElement('div')
        movieContainer.addEventListener('click', ()=>{
            location.hash = `#serie=${serie.id}`
        })
        movieContainer.classList.add('movie-container')
        const img = document.createElement('img')
        img.classList.add('movie-img')
        img.setAttribute('src', IMG_BASE + serie.poster_path)
        img.setAttribute('alt', serie.title)
        movieContainer.appendChild(img)
        genericSection.appendChild(movieContainer)
    })
   
}
async function getMovieDetails(id){
    const { data: movie} = await api(`/movie/${id}`)     //aqui renombramos la variable data por movie
    headerSection.style.background = ''
    relatedMoviesScroll.innerHTML = ''
    const movieImgUrl = IMG_BASE + movie.poster_path;
    
    headerSection.style.background = `url(${movieImgUrl})` //aqui colocamos la url del poster dentro del css ya que el profe puso la imagen en el html a traves de css
    relatedMoviesTitle.innerHTML = 'Peliculas similares'
    headerImg.setAttribute('src', movieImgUrl)
    movieDetailTitle.textContent = movie.title
    movieDetailDescription.textContent = movie.overview
    movieDetailScore.textContent = movie.vote_average
   
    movieDetailCategoriesList.innerHTML = ''
    createCategories(movie.genres, movieDetailCategoriesList)
    getRelatedMovies(id)
}
async function getSerieDetails(id){
    const { data: serie} = await api(`/tv/${id}`)     //aqui renombramos la variable data por movie
    movieDetailCategoriesList.innerHTML = ''
    headerSection.style.background = ''
    relatedMoviesScroll.innerHTML = ''
    relatedMoviesTitle.innerHTML = 'Series similares'
    const serieImgUrl = IMG_BASE + serie.poster_path;
    
    headerSection.style.background = `url(${serieImgUrl})` //aqui colocamos la url del poster dentro del css ya que el profe puso la imagen en el html a traves de css
    headerImg.setAttribute('src', serieImgUrl)
    movieDetailTitle.textContent = serie.name
    console.log(serie);
    movieDetailDescription.textContent = serie.overview
    movieDetailScore.textContent = serie.vote_average
    
    
    createCategories(serie.genres, movieDetailCategoriesList)
    getRelatedSeries(id)
}
async function getRelatedMovies(id){
    const { data} = await api(`/movie/${id}/recommendations`) 
    const related = data.results

    createMovies(related, relatedMoviesScroll)
}
async function getRelatedSeries(id){
    const { data} = await api(`/tv/${id}/recommendations`) 
    const related = data.results

    creteSeries(related, relatedMoviesScroll)
}
//empezamos a optimizar codigo, el lazyloader lo usaremos para cargar solo los elementos que el usuario ve en pantalla en el momento
const lazyLoader = new IntersectionObserver((entries, observer)=>{
    entries.forEach((entry)=>{
       
        if(entry.isIntersecting){
            const url = entry.target.getAttribute('data-img') //el data-img viene dentro de entry.target
            entry.target.setAttribute('src', url )
        }
        
    })
})
function createMovies(movies, container){

    movies.forEach(movie => {
        
        const movieContainer = document.createElement('div')
        
        movieContainer.classList.add('movie-container')
        const img = document.createElement('img')
        img.addEventListener('click', ()=>{
            location.hash = `#movie=${movie.id}`
        })
        img.classList.add('movie-img')        
        img.setAttribute('data-img', IMG_BASE + movie.poster_path)
        img.setAttribute('alt', movie.title)
        movieContainer.appendChild(img)
        container.appendChild(movieContainer)

        //En este paso lo que haremos es definir una imagen por defecto cuando alguna imagen no cargue desde la api
        img.addEventListener('error',()=>{
            //aqui definimos la logica en caso de error
            img.setAttribute('src','./img/ups-error-404-ilustracion-concepto-robot-roto_114360-5529.webp')
        })

        const movieBtn = document.createElement('button')
        movieBtn.classList.add('movie-like-btn')
        
        
        movieContainer.append(movieBtn)
        movieBtn.addEventListener('click', ()=>{
            movieBtn.classList.toggle('movie-like-btn--liked')
        })

        //en cada iteracion a cada imagen le estamos llamando y asignando el lazyloader para ser observado
        lazyLoader.observe(img) //le enviamos como parametro img a la function lazyloader
    })
       
}
function createSeries(series, container){

    series.forEach(serie => {

       
        const serieContainer = document.createElement('div')
        
        serieContainer.classList.add('serie-container')
        const img = document.createElement('img')
        img.addEventListener('click', ()=>{
            location.hash = '#serie=' + serie.id
        })
        img.classList.add('serie-img')
        img.setAttribute('data-img', IMG_BASE + serie.poster_path)
        img.setAttribute('alt', serie.title)
        serieContainer.appendChild(img)
        container.appendChild(serieContainer)
        img.addEventListener('error',()=>{
            //aqui definimos la logica en caso de error
            img.setAttribute('src','./img/ups-error-404-ilustracion-concepto-robot-roto_114360-5529.webp')
        })
        
        lazyLoader.observe(img)

        const serieBtn = document.createElement('button')
        serieBtn.classList.add('serie-like-btn')
        
        
        serieContainer.append(serieBtn)
        serieBtn.addEventListener('click', ()=>{
            serieBtn.classList.toggle('serie-like-btn--liked')
        })


    });
    
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