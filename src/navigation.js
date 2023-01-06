function init(){
    boton.addEventListener('click', ()=>{
        location.hash = `#search=${searchFormInput.value}`
    })
    btnMovieTrend.addEventListener('click',()=>{ location.hash = '#trends'})
    btnSeriesTrend.addEventListener('click',()=>{ location.hash = '#trendiseries'})
}


window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

function navigator(){
    


    if (location.hash.startsWith('#trends')){
        trendsPage();
    }else if (location.hash.startsWith('#search=')){
       searchPage()
    }else if (location.hash.startsWith('#movie=')){
       movieDetailsPage()
    }else if (location.hash.startsWith('#category=')){
       categoriesPage()
    }else if (location.hash.startsWith('#trendiseries')){
        trendSeriesPage()
    }else{
        home()
    }
    
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}
function home(){
    location.hash = '#home'
    navSection.classList.remove('inactive')
    trendingSection.classList.remove('inactive')
    genreSection.classList.remove('inactive')
    seriesSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    genericSection.classList.add('inactive')
    headerSection.classList.remove('header-container--long')
    getTrendingPreview()
    getGenrePreview()    
    getTrendingSeriesPreview()
    init()

   }
function trendsPage(){
    navSection.classList.remove('inactive')
    trendingSection.classList.add('inactive')
    genreSection.classList.add('inactive')
    seriesSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive')
    genericSection.classList.remove('inactive')
    headerSection.classList.remove('header-container--long')
    searchForm.classList.remove('inactive')
    getTrendingMovies()
    init()
}
function searchPage(){
    navSection.classList.remove('inactive')
    trendingSection.classList.add('inactive')
    genreSection.classList.add('inactive')
    seriesSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    genericSection.classList.remove('inactive')
    headerSection.classList.remove('header-container--long')
    searchForm.classList.remove('inactive')
    init()
    const [x, query] = location.hash.split('=') //query representa el valor a buscar escrito por el usuario
    getMoviesBySearch(query)
}
function movieDetailsPage(){
     navSection.classList.remove('inactive')
     trendingSection.classList.add('inactive')
     genreSection.classList.add('inactive')
     seriesSection.classList.add('inactive')
     movieDetailSection.classList.remove('inactive')
     headerTitle.classList.add('inactive')
     headerCategoryTitle.classList.add('inactive')
     genericSection.classList.add('inactive')
     headerSection.classList.add('header-container--long')
     searchForm.classList.remove('inactive')
     init()
}
function categoriesPage(){
    navSection.classList.remove('inactive')
    searchForm.classList.remove('inactive')
    trendingSection.classList.add('inactive')
    genreSection.classList.remove('inactive')
    seriesSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    genericSection.classList.remove('inactive')
    headerSection.classList.remove('header-container--long')
    // window.scroll(0,0);
    init()
    // const id = 
    //AQUI DIVIDIMOS EL HASH PARA OBTENER ESPECIFICAMENTE LA PARTE DEL HASH QUE TIENE EL ID
    const [x, idName] = location.hash.split('=') //en idName obtenemos la parte derecha del hash, (despues del =) lo que contiene el ID y el nombre en este caso Ej: #category=12-Aventura
    const [id, genreName] = idName.split('-') // ahora separamos idName para obtener el id y nombre por separado, lo dividimos en el guion -
    headerCategoryTitle.innerHTML = genreName
    console.log(genreName);
    getMoviesByGenre(id);
    getGenrePreview()   
}
function trendSeriesPage(){
    navSection.classList.remove('inactive')
    trendingSection.classList.add('inactive')
    genreSection.classList.add('inactive')
    seriesSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive')
    genericSection.classList.remove('inactive')
    headerSection.classList.remove('header-container--long')
    searchForm.classList.remove('inactive')
    getTrendingSeries()
    init()
}

