import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import logo from '../assets/NETFLIHS__LOGO.png';
import user from '../assets/user_thumb.png';
import {ReactComponent as Search} from '../assets/search_icon.svg';
import {ReactComponent as Notifications} from '../assets/notifications_icon.svg';
// import {ReactComponent as Arrow} from '../assets/arrow.svg';

const listenToScroll = (setState) => {
    setState(document.documentElement.scrollTop === 0)
}

const Top = category => {
    const [atTop, setAtTop] = useState(true)
    useEffect(() => {
        window.addEventListener('scroll', () => listenToScroll(setAtTop))
        return () => window.removeEventListener('scroll', () => listenToScroll(setAtTop))
    }, [setAtTop])
    return(
        <Bar atTop={atTop}>
            <img src={logo} style={{height: 40, 'margin-right':25}}/>
            <Categories>
                <Category>Home</Category>
                <Category>TV Shows</Category>
                <Category>Movies</Category>
                <Category>New & Popular</Category>
                <Category>My List</Category>
            </Categories>

            <SecondaryNavigation>
                <Search style={{'margin-right':'20px'}}/>
                <Notifications style={{'margin-right':'20px'}}/>
                <img src={user} />
                <Arrow />
            </SecondaryNavigation>
        </Bar>
    )
}

const Bar = styled.div`
  height: 70px;
  background: ${props => props.atTop ?
          'linear-gradient(to top, rgb(20, 20, 20, 0) 0, rgb(20, 20, 20) 100%)' :
          'rgb(20, 20, 20)'};
  transition: 0.6s;
  position: fixed;
  padding: 0 60px 0 60px;
  display: flex;
  align-items: center;
  color: white;
  top: 0;
  left: 0;
  right: 0;
  white-space: nowrap;
`

const Categories = styled.ul`
  display: flex;
  align-items: center;
  font-size: 14px;
`

const Category = styled.li`
  color: #e5e5e5;
  display: inline;
  margin-left: 20px;
`

const SecondaryNavigation = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`

const Arrow = styled.span`
  margin-left: 10px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  border-color: #fff transparent transparent transparent;
  transition: transform 367ms cubic-bezier(.21,0,.07,1),-webkit-transform 367ms cubic-bezier(.21,0,.07,1),-moz-transform 367ms cubic-bezier(.21,0,.07,1),-o-transform 367ms cubic-bezier(.21,0,.07,1);
  
  &:hover {
    transform: rotate(180deg)
  }
`

export default Top