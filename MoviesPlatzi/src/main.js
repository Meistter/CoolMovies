const API = 'https://api.themoviedb.org/3'
const IMG_BASE = 'https://image.tmdb.org/t/p/w300' //300px ancho

async function getTrendingPreview(){
    const res = await fetch(API + '/trending/movie/day' + API_KEY)
    const data = await res.json();
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

getTrendingPreview()

async function getCategoriesPreview(){
    const res = await fetch(API + '/genre/movie/list' + API_KEY)
    const data = await res.json();
    const generos = data.results

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
getCategoriesPreview()
