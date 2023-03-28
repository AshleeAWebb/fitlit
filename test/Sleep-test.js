import { expect } from 'chai';
import Sleep from '../src/Sleep';
import sleepTestData from '../src/data/sleep-test-data.js';
import User from '../src/User';

let sleep;
let user;
let sleep2;

describe('Sleep Repository', () => {
  beforeEach(() => {
    user = new User({
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

    sleep = new Sleep(user.id, sleepTestData.sleepTestData);
    sleep2 = new Sleep();
  });

  it.skip('should store an array of data', () => {
    expect(sleep.data).to.equal(sleepTestData.sleepTestData);
  });

  it.skip('should have an id that matches user', () => {
    expect(sleep.id).to.equal(user.id);
  });

  it.skip('should have default properties', () => {
    expect(sleep.avgHours).to.equal(0);
    expect(sleep.avgQuality).to.equal(0);
    expect(sleep.hoursSlept).to.equal(0);
    expect(sleep.quality).to.equal(0);
    expect(sleep.weekHours).to.equal([]);
    expect(sleep.weekQuality).to.equal([]);
  });

  it.skip('should calculate average hours slept', () => {
    sleep.calculateAverageSleepHours();
    expect(sleep.avgHours).to.equal(7.2375);

    sleep2.calculateAverageSleepHours();
    expect(sleep.avgHours).to.equal(0);
  });

  it.skip('should calculate average sleep quality', () => {
    sleep.calculateAverageSleepQuality();
    expect(sleep.avgQuality).to.equal(3.1625);

    sleep2.calculateAverageSleepQuality();
    expect(sleep.avgQuality).to.equal(0);
  });

  it.skip('should retrieve sleep hours data', () => {
    sleep.hoursSlept("2023/03/1");
    expect(sleep.hoursSlept).to.equal(9.6);

    sleep.hoursSlept("2023/03/3"); 
    expect(sleep.hoursSlept).to.equal(0);   
  });
  
  it.skip('should retrieve sleep quality data', () => {
    sleep.qualityOfSleep("2023/03/1");
    expect(sleep.quality).to.equal(4.3);

    sleep.qualityOfSleep("2023/03/3");
    expect(sleep.quality).to.equal(0);
  });
  
  it.skip('should retrieve sleep hours for specified week', () => {
    sleep.hoursSleptInWeek("2023/03/1");
    expect(sleep.weekHours).to.deep.equal([9.6, 8.4, 9.7, 4.7, 8]);

    sleep.hoursSleptInWeek("2023/04/1");
    expect(sleep.weekHours).to.deep.equal([]);
  });
  it.skip('should retrieve sleep quality for specified week', () => {
    sleep.qualitySleptInWeek("2023/03/1");
    expect(sleep.weekQuality).to.deep.equal([4.3, 3.5, 4.7, 3, 3.1]);

    sleep.qualitySleptInWeek("2023/04/1");
    expect(sleep.weekQuality).to.deep.equal([]);
  });
});