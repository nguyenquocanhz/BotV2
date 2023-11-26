const cron = require('node-cron');
const request = require('request');

const urls = [
    'https://robloxrenhat.com/cron/momo.php	',
    'https://robloxrenhat.com/cron/bank.php'
];

// Thời gian cron theo giây 
cron.schedule('*/30 * * * * *', () => {
  console.log('Load Object At : ', new Date());

  const requests = urls.map(url => {
    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (error) {
          return reject(error);
        }
        resolve(body);
      });
    });
  });

  Promise.all(requests)
    .then(results => {
      console.log(results);
    })
    .catch(error => {
      console.error(error);
    });
});
