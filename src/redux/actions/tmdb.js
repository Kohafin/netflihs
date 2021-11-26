import {API, GET_MOVIE} from '../constants';
import { replaceNormalizedData } from "./dta";
import {
    TRENDING_SCHEMA,
    NETFLIX_SCHEMA,
    TOP_RATED_SCHEMA,
    ACTION_SCHEMA,
    COMEDY_SCHEMA,
    HORROR_SCHEMA,
    ROMANCE_SCHEMA,
    DOCUMENTARY_SCHEMA,
} from '../schemas'

const sections = {
    trending: {
        url: 'trending/all/week?language=en-US',
        schema: TRENDING_SCHEMA,
    },
    netflixOriginals: {
        url: 'discover/tv?with_networks=213',
        schema: NETFLIX_SCHEMA,
    },
    topRated: {
        url: 'movie/top_rated?language=en-US',
        schema: TOP_RATED_SCHEMA,
    },
    action: {
        url: 'discover/movie?with_genres=28',
        schema: ACTION_SCHEMA,
    },
    comedy: {
        url: 'discover/movie?with_genres=35',
        schema: COMEDY_SCHEMA,
    },
    horror: {
        url: 'discover/movie?with_genres=27',
        schema: HORROR_SCHEMA,
    },
    romance: {
        url: 'discover/movie?with_genres=10749',
        schema: ROMANCE_SCHEMA,
    },
    documentary: {
        url: 'discover/movie?with_genres=99',
        schema: DOCUMENTARY_SCHEMA,
    },
}

export const getMovies = (section) => ({
    type: API,
    payload: {
        url: sections[section].url,
        success: replaceNormalizedData(section),
        normalize: {results: [sections[section].schema]},
        name: 'get ' + section,
    },
});

export const getMovie = () => ({ type: GET_MOVIE })