//Secciones
const navSection = document.querySelector('#navbar') // siempre se muestra
const trendingSection = document.querySelector('#trending')
const seriesSection = document.querySelector('#trendingSeries')
const genreSection = document.querySelector('#genre');
const movieDetailSection = document.querySelector('#movieDetail')
const headerSection = document.querySelector('#header');
// Listas y contenedores

const searchForm = document.querySelector('#searchForm');
const trendinMoviesListContainer = document.querySelector('.trending-movieList')
const seriesListContainer = document.querySelector('.trendingSeries-movieList')
const categoriesListContainer = document.querySelector('.genre-list')

// Elementos

const headerTitle = document.querySelector('.header-title');
const headerCategoryTitle = document.querySelector('.header-title--categoryView');
const searchFormInput = document.querySelector('#searchForm input');
const searchFormBtn = document.querySelector('#searchbtn');

const movieDetailTitle = document.querySelector('.movieDetail-title');
const movieDetailDescription = document.querySelector('.movieDetail-description');
const movieDetailScore = document.querySelector('.movieDetail-score');