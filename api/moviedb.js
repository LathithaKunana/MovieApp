import axios from "axios";
import { apiKey } from "../constants";

//endpoints

const apiBaseUrl = 'https://api.themoviedb.org/3'
const trendingMoviesEndpoints = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingaMoviesEndpoints = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoints = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`


// dynamic endpoints

const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`
const searchMoviesEndpoint =  `${apiBaseUrl}/search/movie?api_key=${apiKey}`

const personDetailsEndpoints = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`
const personMovieEndpoints = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`


export const image500 = path=> path?`https://image.tmdb.org/t/p/w500/${path}`: null;
export const image342 = path=> path?`https://image.tmdb.org/t/p/w342/${path}`: null;
export const image185 = path=> path?`https://image.tmdb.org/t/p/w185/${path}`: null;

export const fallbackMoviePoster = 'https://t4.ftcdn.net/jpg/02/63/51/95/360_F_263519536_GO50i8nK2uFH5R5umRjBBndFD32phv5o.jpg'
export const fallbackPersonImage = 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png'

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params:params? params:{}
    }
    try{
        const response = await axios.request(options);
        return response.data;
    } catch(error) {
        console.log('error:', error)
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoints);
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingaMoviesEndpoints);
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoints);
}

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id));
}
export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndpoint(id));
}
export const fetchPersonDetails = id => {
    return apiCall(personDetailsEndpoints(id));
}
export const fetchPersonMovies = id => {
    return apiCall(personMovieEndpoints(id));
}
export const searchMovies = params => {
    return apiCall(searchMoviesEndpoint, params)
}


