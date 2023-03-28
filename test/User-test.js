import { expect } from 'chai';
import User from '../src/User';
import Sleep from '../src/data/Sleep';
import Hydration from '../src/data/Hydration';
import Activity from '../src/data/Activity';
import userTestData from '../src/data/user-test-data.js';
import activityTestData from '../src/data/activity-test-data.js';
import hydrationTestData  from '../src/data/hydration-test-data';

describe('User Repository', () => {
  beforeEach(() =>{
    let testUser = new User({
      "id": 1,
      "name": "Trystan Gorczany",
      "address": "9484 Lucas Flat, West Kittymouth WA 67504",
      "email": "Taurean_Pollich31@gmail.com",
      "strideLength": 4,
      "dailyStepGoal": 7000,
      "friends": [
        5,
        43,
        46,
        11
      ]
    });

    let testHydrationData = new Hydration(hydrationTestData);
    let testSleepData = new Sleep(activityData);
    let testActivityData = new Activity(activityTestData);

    testUser.hydrationData = testHydrationData;
    testUser.sleepData = testSleepData;
    testUser. sleepData = testActivityData;

    let testUser2 = new User();
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it.skip('should set all the properties using setData()', () => {
    expect(testUser.id).to.equal(1);
    expect(testUser.name).to.equal("Trystan Gorczany");
    expect(testUser.address).to.equal("9484 Lucas Flat, West Kittymouth WA 67504");
    expect(testUser.email).to.equal("Taurean_Pollich31@gmail.com");
    expect(testUser.strideLength).to.equal(4);
    expect(testUser.dailyStepGoal).to.equal(7000);
    expect(testUser.friends).to.deep.equal([ 5, 43, 46, 11 ]);
  });

  it.skip('should store hydration data', () => {
    expect(testUser.hydrationData).to.be.an.instanceOf(Hydration);
    expect(testUser.hydrationData.data.length).to.equal(8);
  });

  it.skip('should store sleep data', () => {
    expect(testUser.sleepData).to.be.an.instanceOf(Sleep);
    expect(testUser.sleepData.data.length).to.equal(8);
  });

  it.skip('should store activity data', () => {
    expect(testUser.activityData).to.be.an.instanceOf(Activity);
    expect(testUser.activityData.data.length).to.equal(8);
  });
  
  it.skip('should be able to retun friends friends names', () => {
    expect(testUser.getFriends()).to.equal("Brycen");
    expect(testUser2.getFriends()).to.equal("Embrace the Solitude");
  });

  it.skip('should get the average step goals of all users', () => {
    expect(testUser.getAverage()).to.equal(6570);
  });

  it.skip('should get the users first name', () => {
    expect(testUser.getName()).to.equal('Trystan');
    expect(testUser2.getName()).to.equal('User');
  });

});