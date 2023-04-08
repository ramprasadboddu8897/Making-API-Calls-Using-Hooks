import Header from './components/Header'
import LeaderBoard from './components/Leaderboard'

import {
  GlobalStyle,
  MainContainer,
  Title,
  Description,
} from './styledComponents'

const App = () => (
  <>
    <GlobalStyle />
    <MainContainer>
      <Header />
      <Title>Think &lt;Code&gt; Innovate</Title>
      <Description>Make it work, Make it right, Make it fast</Description>
      <LeaderBoard />
    </MainContainer>
  </>
)

export default App
