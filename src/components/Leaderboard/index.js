import Loader from 'react-loader-spinner'
import {useState, useEffect} from 'react'
import {
  LeaderBoardContainer,
  LoadingViewContainer,
  ErrorMessage,
} from './styledComponents'
import LeaderBoardTable from '../LeaderboardTable'

const LeaderBoard = () => {
  // Your code goes here...
  const apiStatusConstants = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
  }
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  })

  useEffect(() => {
    const getLeaderBoardDetails = async () => {
      const url = 'https://apis.ccbp.in/leaderboard'
      const options = {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU',
        },
      }
      setApiResponse({
        status: apiStatusConstants.inProgress,
        data: null,
        errorMsg: null,
      })
      const response = await fetch(url, options)
      const responseData = await response.json()
      //   console.log(responseData)
      if (response.ok) {
        setApiResponse(prevApiResponse => ({
          ...prevApiResponse,
          status: apiStatusConstants.success,
          data: responseData,
        }))
      } else {
        setApiResponse(prevResponse => ({
          ...prevResponse,
          status: apiStatusConstants.failure,
          errorMsg: responseData.error_msg,
        }))
      }
    }
    getLeaderBoardDetails()
  }, [])
  const renderLoadingView = () => (
    <LoadingViewContainer>
      <Loader type="ThreeDots" color="#ffff" />
    </LoadingViewContainer>
  )

  const renderSuccessView = () => {
    const {data} = apiResponse
    const formattedLeaderBoardData = data.leaderboard_data.map(eachUser => ({
      id: eachUser.id,
      name: eachUser.name,
      rank: eachUser.rank,
      profileImgUrl: eachUser.profile_image_url,
      score: eachUser.score,
      language: eachUser.language,
      timeSpent: eachUser.time_spent,
    }))
    return <LeaderBoardTable leaderboardData={formattedLeaderBoardData} />
  }

  const renderFailureView = () => {
    const {errorMsg} = apiResponse
    return <ErrorMessage>{errorMsg}</ErrorMessage>
  }

  const renderLeaderBoard = () => {
    // Your code goes here...
    const {status} = apiResponse
    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return <LeaderBoardContainer>{renderLeaderBoard()}</LeaderBoardContainer>
}

export default LeaderBoard
