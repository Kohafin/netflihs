import React, {useEffect} from 'react';
import { get } from 'lodash/fp';
import { connect } from "react-redux";
import styled from 'styled-components';
import { getMovies } from "../redux/actions/tmdb";

const IMG_SOURCE = 'https://image.tmdb.org/t/p/original/'

const Row = ({ title, endpoint, poster, movies, getMovies }) => {
    useEffect(() => getMovies(endpoint), [endpoint, getMovies])

    return (
        <MoviesRow>
            <h1>{title}</h1>

            <RowPosters className={'row' + (poster ? ' poster__row' : '') }>
                {
                    Object.values(movies).map(movie => {
                        return (
                                <BackdropImg
                                    key={movie.id}
                                    className={poster ? 'poster' : ''}
                                    src={IMG_SOURCE + (poster ? movie.poster_path : movie.backdrop_path)}
                                    alt={movie.title} />
                        )
                    })
                }
            </RowPosters>
    </MoviesRow>
    )
}

const mapStateToProps = (state, props) => ({
    movies: get(`data.${props.endpoint}`, state) || []
})

const MoviesRow = styled.div`
  position: relative;
  margin-left: 20px;
  color: white;
  
    .poster__row {
      padding: 30px;
    }
`

const RowPosters = styled.div`
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    padding: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
  
  .poster {
    max-height: 250px;
  }

  .poster:hover {
    transform: scale(1.2)
  }
`

const BackdropImg = styled.img.attrs(() => ({className: 'poster__img'}))`
    object-fit: contain;
    width: 16.6%;
  padding: 0 0.2vw;
    max-height: 100%;
    border-radius: 4px;
    margin-right: 2px;
    transition: transform .54s cubic-bezier(.5,0,.1,1) 0s,-webkit-transform .54s cubic-bezier(.5,0,.1,1) 0s,-moz-transform .54s cubic-bezier(.5,0,.1,1) 0s,-o-transform .54s cubic-bezier(.5,0,.1,1) 0s;;
  
  
  &:hover {
    transform: scale(1.2)
  }
`

export default connect(mapStateToProps, { getMovies })(Row)