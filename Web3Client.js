const {Web3} = require('web3');
const contractAbi = '[{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_laborHistory","type":"string"},{"internalType":"uint256","name":"_applicationType","type":"uint256"}],"name":"addApplicant","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_jobId","type":"uint256"},{"internalType":"string","name":"_jobTitle","type":"string"},{"internalType":"string","name":"_jobDescription","type":"string"},{"internalType":"uint256","name":"_salary","type":"uint256"}],"name":"addJob","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_applicantId","type":"uint256"},{"internalType":"uint256","name":"_jobId","type":"uint256"}],"name":"applyForJob","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"applicantId","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"enum JobPortal.ApplicationType","name":"applicationType","type":"uint8"}],"name":"ApplicantAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"applicantId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"jobId","type":"uint256"}],"name":"ApplicationSubmitted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"jobId","type":"uint256"},{"indexed":false,"internalType":"string","name":"jobTitle","type":"string"},{"indexed":false,"internalType":"uint256","name":"salary","type":"uint256"},{"indexed":true,"internalType":"address","name":"jobProvider","type":"address"}],"name":"JobAdded","type":"event"},{"inputs":[{"internalType":"uint256","name":"_applicantId","type":"uint256"},{"internalType":"uint256","name":"_rating","type":"uint256"}],"name":"provideRating","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"applicantId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rating","type":"uint256"}],"name":"RatingProvided","type":"event"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"applicantRatings","outputs":[{"internalType":"uint256","name":"applicantId","type":"uint256"},{"internalType":"uint256","name":"rating","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"applicants","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"laborHistory","type":"string"},{"internalType":"enum JobPortal.ApplicationType","name":"applicationType","type":"uint8"},{"internalType":"bool","name":"isRegistered","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"applications","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getApplicantDetails","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"enum JobPortal.ApplicationType","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_applicantId","type":"uint256"}],"name":"getApplicantRating","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getApplicantType","outputs":[{"internalType":"enum JobPortal.ApplicationType","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_jobId","type":"uint256"}],"name":"getJobDetails","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"jobs","outputs":[{"internalType":"uint256","name":"jobId","type":"uint256"},{"internalType":"string","name":"jobTitle","type":"string"},{"internalType":"string","name":"jobDescription","type":"string"},{"internalType":"uint256","name":"salary","type":"uint256"},{"internalType":"address","name":"jobProvider","type":"address"},{"internalType":"bool","name":"isOpen","type":"bool"}],"stateMutability":"view","type":"function"}]';
const contractAddress = '0xea26C7F656E598155cB49047f36A68F20Fae8cFb';
const providerUrl = 'http://127.0.0.1:7545';

const provider = new Web3.providers.HttpProvider(providerUrl);

const web3 = new Web3(provider);

//console.log(web3);
const accounts = web3.eth.getAccounts();
const yourFunctionParameters = {
    from: '0xF38cE64E07eb4187CafECB7Ad69c91e47388508a',
    gas: 2000000, 
  };

const jobPortalContract = new web3.eth.Contract(JSON.parse(contractAbi), contractAddress);


async function addApplicant(id, name, laborHistory, applicationType) {
    //const accounts = await web3.eth.getAccounts();
    await jobPortalContract.methods.addApplicant(id, name, laborHistory, applicationType)
        .send(yourFunctionParameters);
}

async function getApplicantDetails(id) {
    return await jobPortalContract.methods.getApplicantDetails(id).call();
}

async function addJob(jobId, jobTitle, jobDescription, salary) {
    const accounts = await web3.eth.getAccounts();
    await jobPortalContract.methods.addJob(jobId, jobTitle, jobDescription, salary)
        .send(yourFunctionParameters);
}

async function getJobDetails(jobId) {
    return await jobPortalContract.methods.getJobDetails(jobId).call();
}

async function applyForJob(applicantId, jobId) {
    const accounts = await web3.eth.getAccounts();
    await jobPortalContract.methods.applyForJob(applicantId, jobId)
        .send(yourFunctionParameters);
}

async function provideRating(applicantId, rating) {
    const accounts = await web3.eth.getAccounts();
    await jobPortalContract.methods.provideRating(applicantId, rating)
        .send(yourFunctionParameters);
}

async function getApplicantRating(applicantId) {
    return await jobPortalContract.methods.getApplicantRating(applicantId).call();
}

//Add Applicant
 addApplicant(2, "Ashutosh", "MGR", 2);
// //Get Applicant Details
  jobPortalContract.methods.getApplicantDetails(2).call(yourFunctionParameters)
  .then((result) => {
    console.log('Read Function Result:', result);
  })
  .catch((error) => {
    console.error('Error calling Read Function:', error.message);
  });
          

//Add Job
addJob(101, "Software Developer", "Develop software applications", 5000);
//Get Job Details
  jobPortalContract.methods.getJobDetails(102).call(yourFunctionParameters)
  .then((result) => {
    console.log('Read Function Result:', result);
  })
  .catch((error) => {
    console.error('Error calling Read Function:', error.message);
  });
//Apply For Job
applyForJob(1, 101);

//Give Rating to Applicant
provideRating(1, 1);

//Get Applicant Rating
jobPortalContract.methods.getApplicantRating(1).call(yourFunctionParameters)
  .then((result) => {
    console.log('Read Function Result:', result);
  })
  .catch((error) => {
    console.error('Error calling Read Function:', error.message);
  });


