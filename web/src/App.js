import './App.css';
import styled from 'styled-components';
import Top from './components/Top';
import Billboard from "./components/Billboard";
import Row from './components/Row';

const Rows = () => (
    <Container>
        <Row title='Trending Now' endpoint='trending' />
        <Row title='NETFLIX ORIGINALS' endpoint='netflixOriginals' />
        <Row title='Top Rated' endpoint='topRated' />
        <Row title='Action' endpoint='action' />
        <Row title='Comedy' endpoint='comedy' />
        <Row title='Horror' endpoint='horror' />
        <Row title='Romance' endpoint='romance' />
        <Row title='Documentary' endpoint='documentary' />
    </Container>
)

function App() {
  return (
      <div className='app'>
          <Top />
          <Billboard />
          <Rows />
      </div>
  );
}

const Container = styled.div`
  background-color: rgb(20, 20, 20);
`

export default App;
