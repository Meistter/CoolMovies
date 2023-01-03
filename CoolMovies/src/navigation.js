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
    getTrending()
    getGenre()    
    getTrendingSeries()
}
function trendsPage(){
    console.log('Estamos en Trends');
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