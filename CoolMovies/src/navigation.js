window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

function navigator(){
    
    // console.log({location});

    if (location.hash.startsWith('#trends')){
        trendsPage();
    }else if (location.hash.startsWith('#search=')){
       searchPage()
    }else if (location.hash.startsWith('#movie=')){
       movieDetailsPage()
    }else if (location.hash.startsWith('#category=')){
       categoriesPage()
    }else{
        home()
    }
    
    // location.hash
}
function home(){
    navSection.classList.remove('inactive')
    trendingSection.classList.remove('inactive')
    genreSection.classList.remove('inactive')
    seriesSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive')
    getTrending()
    getGenre()    
    getTrendingSeries()

    // Para hacer: copiar y pegar todos estos classList en cada function y determinar que queremos y que no queremos que se vea
}
function trendsPage(){
   
}
function searchPage(){
    console.log('Estamos en la busqueda');
}
function movieDetailsPage(){
    console.log('Estamos en las peliculas');
}
function categoriesPage(){
    console.log('Estamos en las categorias');
}