import React, {useEffect} from 'react'
import {get} from 'lodash/fp';
import {connect} from "react-redux";
import styled from 'styled-components';
import {getMovie, getMovies} from "../redux/actions/tmdb";
import BillboardInfo from "./BillboardInfo";

const Billboard = ({movie, getMovies, trending, getMovie}) => {
    useEffect(() => {
        if(trending !== undefined) {
            getMovie()
        } else {
            getMovies('trending')
        }

    }, [getMovie, getMovies, trending]);

    return (
        <>
            <Component img={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}>

                <Fader/>
                <BillboardInfo movie={movie}/>
            </Component>
        </>
    )
}

const Component = styled.header`
  display: flex;
  flex-direction: column-reverse;
  background-size: cover;
  background-image: url("${props => props.img}");
  background-position: center center;
  color: white;
  object-fit: contain;
  height: 56.25vw;
`

const Fader = styled.div`
  background-image: linear-gradient(to bottom, rgba(20, 20, 20, 0) 0, rgba(20, 20, 20, .15) 15%, rgba(20, 20, 20, .35) 29%, rgba(20, 20, 20, .58) 44%, #141414 68%, #141414 100%);
  background-size: 100% 100%;
  background-position: 0 top;
  background-repeat: repeat-x;
  background-color: transparent;
  width: 100%;
  height: 14.7vw;
`

const mapStateToProps = state => ({
    movie: get('data.movie', state) || {},
    trending: get('data.trending', state)
})

export default connect(mapStateToProps, {getMovie, getMovies})(Billboard)