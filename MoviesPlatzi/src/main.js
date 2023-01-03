const API_URL = 'https://api.themoviedb.org/3'
const IMG_BASE = 'https://image.tmdb.org/t/p/w300' //300px ancho

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params:{
        'api_key': API_KEY
    }
})

async function getTrendingPreview(){
    const {data, status} = await api('/trending/movie/day')
    
    const movies = data.results

    movies.forEach(movie => {

        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')
        const movieSection = document.querySelector('#trendingPreview .trendingPreview-movieList')

        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src',IMG_BASE + movie.poster_path,)

        movieContainer.appendChild(movieImg)
        movieSection.appendChild(movieContainer)
        
    });
}




// En esta funcion usamos FETCH y no AXIOS para que nos quede el ejemplo
async function getCategoriesPreview(){
    const res = await fetch(API_URL + '/genre/movie/list' + '?api_key=' + API_KEY)
    const data = await res.json();
    const generos = data.genres
       
    generos.forEach(genero => {

        const generoContainer = document.createElement('div')
        generoContainer.classList.add('category-container')

        const generoTitle = document.createElement('h3')
        generoTitle.setAttribute('id', genero.name)
        generoTitle.classList.add('category-title')
        const generoTitleText = document.createTextNode(genero.name)
        generoTitle.appendChild(generoTitleText)

        const generoSection = document.querySelector('#categoriesPreview .categoriesPreview-list')

        generoContainer.appendChild(generoTitle)
        generoSection.appendChild(generoContainer)
        
    });
}

