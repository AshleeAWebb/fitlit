// Webpack Links
import { fetchAllData } from '../src/apiCalls';
import { postActivityData } from '../src/apiCalls';
import { fetchActivityData } from '../src/apiCalls';
import { displayChart } from '../src/charts';
import { displayChallengeChart } from '../src/charts';
import { charts } from '../src/charts';
import dayjs from 'dayjs';
import './css/styles.scss';
import './images/fitlit-logo.png';
import './images/high.png';
import './images/medium.png';
import './images/low.png';
import {sayings} from'./data/motivation-data.js';
import User from '../src/User';
import Sleep from '../src/Sleep';
import Hydration from '../src/Hydration';
import Activity from '../src/Activity';


// Queury Selectors
const firstName = document.getElementById('userName'),
      userInfo = document.getElementById('userInfo'),
      sleepInfo = document.getElementById('sleepInfoBox'),
      sleepWeek = document.getElementById('sleepBoxWeek'),
      hydrationInfo = document.getElementById('hydrationInfoBox'),
      hydrationWeek = document.getElementById('hydrationBoxWeek'),
      activityInfo = document.getElementById('activityInfoBox'),
      activityWeek = document.getElementById('activityBoxWeek'),
      userInputForm = document.querySelector('form'),
      formInputs = document.querySelectorAll('.data-input'),
      modal = document.getElementById('activityModal'),
      openModalBtn = document.getElementById('openModalBtn'),
      closeBtn = document.querySelector(".close-btn"),
      stepChallengeBox = document.getElementById('stepChallengeBox'),
      inputError = document.getElementById('errorMessage'),
      userInputButton = document.getElementById('userInputBtn'),
      popUpMotovationBox = document.getElementById('popUp'),
      closeMotovationButton = document.getElementById('close-motovation-btn'),
      motivationButtonContainer = document.querySelector('.motivation-buttons'),
      motivationButtons = document.querySelectorAll('.motivation-buttons'),
      motivationQuestion = document.getElementById('popUpQuestion');

// Global Variables
let users,
    user,
    userChallengeData,
    friendsChallengeData = [],
    inputs = [];

formInputs.forEach(input => inputs.push(input));


// DM Methods

const checkValue = () => {
  if (inputs.every(input => input.value)) {
    inputError.innerText = "";
  }
}

const getUserData = (infoType, array, userInst = user) => {
  return array[infoType].filter(data => data.userID === userInst.id).reverse();
};

const createFriends = (info) => {
  user.friends = user.friends.map(friend => {
    return new User(users.find(user => user.id === friend));
  });
  user.friends.forEach(friend => {
    friend.activity = new Activity(getUserData('activityData', info[3], friend));    });
};

const postChallengeStats = () => {
  userChallengeData = getStepChallengeStats(user);
  user.friends.forEach(friend => {
    friendsChallengeData.push(getStepChallengeStats(friend));
  });
};

const getStepChallengeStats = (challenger) => {
  const averageStepGoal = challenger.dailyStepGoal;
  const stepsForTheWeek = challenger.activity.getLatestWeek();
  const dailyGoalAchieved = stepsForTheWeek.filter((steps) => steps >= averageStepGoal);
  return { name: challenger.name, daysReached: dailyGoalAchieved.length };
};

//DOM methods

const displayCurrentUser = (user) => {
  firstName.innerText = `${user.getName()}`;
  userInfo.innerHTML = `<li>Address: ${user.address}</li>
  <li><b>Email:</b> ${user.email}</li> 
  <li>Stride Length: ${user.strideLength}</li>
  <li>Daily Step Goal: ${user.dailyStepGoal}</li>
  <li>Friends: ${user.getFriends(users)}</li>
  <li>Your Step Goal Compared to All Users: ${user.dailyStepGoal}/${user.getAverage(users)}</li>`
};

const displaySleepInfo = (sleep) => {
  let latestSleep = sleep.data[sleep.data.length - 1],
    pastWeekSleep = sleep.getInfoForPastWeek('hoursSlept'),
    avgQuality = sleep.getAverage('sleepQuality'),
    avgHours = sleep.getAverage('hoursSlept');

  sleepInfo.innerHTML = `<li>Latest Hours Slept: ${latestSleep.hoursSlept}</li>
  <li>Latest Quality of Sleep: ${latestSleep.sleepQuality}</li><li> Average Sleep Quality: ${avgQuality.toFixed(1)}</li>
  <li>Average Hours Slept: ${avgHours.toFixed(1)}</li>`
  displayChart(pastWeekSleep, sleepWeek, "Sleep for the Week");
};

const displayHydration = (userId) => {
  let currentDate = user.hydration.data[0].date;
  let weekData = user.hydration.findWeeklyHydration();

  hydrationInfo.innerHTML = `<li>Average daily water intake: ${user.hydration.findAvgDailyHydration(userId)}oz</li>
  <li>Fluid ounces drank today: ${user.hydration.getHydrationSpecificDay(currentDate)}oz</li>`;
  displayChart(weekData, hydrationWeek, "Hydration for the Week");
};

const displayActivity = () => {
  let currentDate = user.activity.data[0].date;
  let weekData = user.activity.getLatestWeek();

  activityInfo.innerHTML = `<li>Latest # of Steps: ${user.activity.getDailyActivityInfo(currentDate, 'numSteps')}</li>
  <li>Latest # of Minutes Active: ${user.activity.getDailyActivityInfo(currentDate, 'minutesActive')}</li>
  <li>Latest Distance Walked: ${user.activity.calculateMiles(currentDate)}</li>`;
  displayChart(weekData, activityWeek, "Activity for the Week");
};

const resetDOM = () => {
  charts[2].destroy();
  charts.pop();
  displayActivity();
  inputError.innerText = "";
  userInputForm.reset();
  modal.style.display = "none";
};

const motivationHandler = (event) => {
  let motivationLvl = event.target.parentNode?.id ?? event.target.id;
  const sayingsArray = sayings[motivationLvl + 'MotivationSayings'];
  const saying = sayingsArray[Math.trunc(Math.random() * sayingsArray.length)];
  motivationButtonContainer.classList.add('saying');
  motivationButtonContainer.innerHTML = saying;
  motivationQuestion.innerHTML = '';
};

// Event Listeners
window.addEventListener('load', () => {
  fetchAllData()
  .then(data => {
      users = data[0].users;

      user = new User(data[0].users[Math.floor(Math.random() * 50)]);
      displayCurrentUser(user);

      user.hydration = new Hydration(getUserData('hydrationData', data[1]));
      displayHydration(user.id);

      user.sleep = new Sleep(getUserData('sleepData', data[2]));
      displaySleepInfo(user.sleep);

      user.activity = new Activity(getUserData('activityData', data[3]), user.strideLength);
      displayActivity(user.id);

      createFriends(data);
      postChallengeStats();
      displayChallengeChart(stepChallengeBox, userChallengeData, friendsChallengeData);

      popUpMotovationBox.classList.add('open-popUp');
    })
  .catch(err => console.log(err));
});

inputs.forEach(input => input.addEventListener('input', checkValue))

openModalBtn.onclick = function() {
  modal.style.display = "block";
};

closeBtn.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  };
};

closeMotovationButton.onclick = () => {
  popUpMotovationBox.classList.remove('open-popUp');
  userInputButton.style.visibility = 'visible';
};


motivationButtons.forEach((b) => b.addEventListener('click', motivationHandler))
  openModalBtn.onclick = function() {
  modal.style.display = "block";
};

userInputForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  if (inputs.some(input => !input.value)) {
    inputError.innerText = "All fields are required";
  } else {
    const userInputData = {
      userID: user.id,
      date: dayjs().format('YYYY/MM/DD'),
      flightsOfStairs: parseInt(inputs.find(input => input.id === "flightsOfStairs").value),
      minutesActive: parseInt(inputs.find(input => input.id === "activeMinutes").value),
      numSteps: parseInt(inputs.find(input => input.id === "numSteps").value)
    };

    postActivityData(userInputData)
    .then(res => {
      console.log('POST successful: ', res);

      fetchActivityData()
      .then(data => {
        user.activity = new Activity(getUserData('activityData', data), user.strideLength);
        resetDOM()
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
   }
});