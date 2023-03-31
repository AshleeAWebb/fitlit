import User from './User'
import Hyrdation from './Hydration'
import Sleep from './Sleep'
import { displaySleepInfo } from './scripts'

function fetchApiData(url) {
  const fetchedUserData = fetch(url)
  .then(res => res.json())
  .then(data => {
    // let user = new User((data.users[Math.floor(Math.random() * data.users.length)]))
    // displayCurrentUser(user)
    let getRandomID = Math.floor(Math.random() * 50)
    let sleepData = data.sleepData.filter(data => data.userID === getRandomID)
    let sleep = new Sleep(sleepData)
    displaySleepInfo(sleep)
    
    // let hydration = new Hyrdation(data.hydrationData[0])
    // displayHydrationAvg(0)

  })
  .catch((error) => console.log(error));

  return fetchedUserData;
}

export { fetchApiData }

//     displayCurrentUser(user);


//     fetch("https://fitlit-api.herokuapp.com/api/v1/sleep")
//     .then(res => res.json())
//     .then(data => {

//     })
//     fetch("https://fitlit-api.herokuapp.com/api/v1/hydration")
//     .then(res => res.json())
//     .then(data => {

//     })

//     fetch('https://fitlit-api.herokuapp.com/api/v1/activity')
//     .then(res => res.json())
//     .then (data => {

//     })

//   })
// }