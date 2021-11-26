import React from 'react'
import styled from 'styled-components';
import { truncate } from 'lodash/fp';
import {ReactComponent as TopTen} from '../assets/top_10.svg';
import {ReactComponent as Play} from '../assets/play_logo.svg';
import {ReactComponent as MoreInfo} from '../assets/info_logo.svg';

const desriptionTitle = movie => {
    if(movie.media_type === 'movie') {
        const place = String(movie.id)[0]
        return(
            <>
                <TopTen style={{height:'1.5em', width:'1.5em', 'margin-right':'0.5em', color:'#E50914' }} />
                {`#${place} in Movies Today`}
            </>

        )
    } else {
        return(
            'Watch Season 1 Now'
        )
    }
}

const BillboardInfo = ({movie}) => (
            <Content>
                {/*<Title>*/}
                {/*    { movie?.title || movie?.name || movie?.original_name }*/}
                {/*</Title>*/}
                <img width='40%' src="https://occ-0-1853-299.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABd1pSCdxeSxe2yOdu5Oz5KnOkQKLRylFWT6M1X6pnkVScVMMUxpklpjT7KJgwq5x4D_ochM3uHjaT0a3zcfQpjZekv1K-cSmg048f80p1qA55SHues5WIWxs_uEo5p6VxauROM49yBgDvD6toOoaRhalkTiUlhZOytEz0kPTonGIqA.webp?r=2b8" />
                <Header>
                    { desriptionTitle(movie) }
                </Header>

                <DescriptionFader>
                    <Description>{ truncate({ length: 250, separator: ' ' }, movie?.overview) }</Description>
                </DescriptionFader>

                <Buttons>
                    <Button className='play'>
                        <Play style={{height: '100%', width: '100%'}}/>
                        <div style={{width:'1rem'}}/>
                        <div style={{'margin-left':'1rem'}}>Play</div>
                    </Button>
                    <Button>
                        <MoreInfo style={{height: '100%', width: '100%'}}/>
                        <div style={{width:'1rem'}}/>
                        <div style={{'margin-left':'1rem'}}>More Info</div>
                    </Button>
                </Buttons>
            </Content>
    )

const Content = styled.div`
  color: #fff;
  margin-left: 5em;
  padding-top: 10%;
  height: 100%;
`

const Title = styled.div`

`

const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6vw;
  transition: color 1s cubic-bezier(.165,.84,.44,1);
  text-shadow: 2px 2px 4px rgb(0 0 0 / 45%);
  font-weight: 700;
  margin: 1vw 0;
`
const Buttons = styled.div`
display: flex;
  margin-top: 20px;
  .play {
    background-color: #fff;
    color: #000
  }
  .play:hover{
      background-color: rgba(255, 255, 255, .75);
      color: #000
  }
`
const Button = styled.button`
  display: flex;
  white-space: nowrap;
  align-items: center;
  cursor: pointer;
  color: #fff;
  outline: none;
  border: none;
  border-radius: 0.2vw;
  padding: .5rem 2.4rem .5rem 2rem;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.4rem;
  margin-right: 1rem;
  background-color: rgba(109,109,110,0.7);

  &:hover {
    color: #fff;
    background-color: rgba(109,109,110,0.4);
    transition: all 0.2s;
  }
`

const DescriptionFader = styled.div`
    
`

const Description = styled.div`
  width: 33%;
  max-width: 33%;
  font-weight: 400;
  line-height: normal;
  width: 100%;
  font-size: 1.4vw;
  text-shadow: 2px 2px 4px rgb(0 0 0 / 45%);
  margin-top: 0.1vw;
`

const Fader = styled.div`
  background-image: linear-gradient(to bottom,rgba(20,20,20,0) 0,rgba(20,20,20,.15) 15%,rgba(20,20,20,.35) 29%,rgba(20,20,20,.58) 44%,#141414 68%,#141414 100%);
  background-size: 100% 100%;
  background-position: 0 top;
  background-repeat: repeat-x;
  background-color: transparent;
  width: 100%;
  height: 14.7vw;
  top: auto;
  bottom: -1px;
  opacity: 1;
`

export default BillboardInfo