// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JobPortal {
    address public admin;
    
    enum ApplicationType { Unskilled, SemiSkilled, Skilled }
    
    struct Applicant {
        uint256 id;
        string name;
        string laborHistory;
        ApplicationType applicationType;
        bool isRegistered;
    }
    
    struct Job {
        uint256 jobId;
        string jobTitle;
        string jobDescription;
        uint256 salary;
        address jobProvider;
        bool isOpen;
    }
    
    struct Rating {
        uint256 applicantId;
        uint256 rating;
    }

    mapping(uint256 => Applicant) public applicants;
    mapping(uint256 => Job) public jobs;
    mapping(address => mapping(uint256 => bool)) public applications;
    mapping(uint256 => Rating) public applicantRatings;

    event ApplicantAdded(uint256 applicantId, string name, ApplicationType applicationType);
    event JobAdded(uint256 jobId, string jobTitle, uint256 salary, address indexed jobProvider);
    event ApplicationSubmitted(uint256 applicantId, uint256 jobId);
    event RatingProvided(uint256 applicantId, uint256 rating);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    constructor() {
        admin = msg.sender;
        // if(msg.sender == address(0xF38cE64E07eb4187CafECB7Ad69c91e47388508a))
        // {
        //     admin = msg.sender;
        // }
    }

    function addApplicant(uint256 _id, string memory _name, string memory _laborHistory, uint256 _applicationType) external onlyAdmin {
        require(!applicants[_id].isRegistered, "Applicant already registered");
        applicants[_id] = Applicant(_id, _name, _laborHistory, ApplicationType(_applicationType), true);
        emit ApplicantAdded(_id, _name, ApplicationType(_applicationType));
    }

    function getApplicantDetails(uint256 _id) external view returns (string memory, string memory, ApplicationType) {
        return (applicants[_id].name, applicants[_id].laborHistory, applicants[_id].applicationType);
    }

    function getApplicantType(uint256 _id) external view returns (ApplicationType) {
        return applicants[_id].applicationType;
    }

    function addJob(uint256 _jobId, string memory _jobTitle, string memory _jobDescription, uint256 _salary) external onlyAdmin {
        require(!jobs[_jobId].isOpen, "Job already exists");
        jobs[_jobId] = Job(_jobId, _jobTitle, _jobDescription, _salary, msg.sender, true);
        emit JobAdded(_jobId, _jobTitle, _salary, msg.sender);
    }

    function getJobDetails(uint256 _jobId) external view returns (string memory, string memory, uint256, address) {
        return (jobs[_jobId].jobTitle, jobs[_jobId].jobDescription, jobs[_jobId].salary, jobs[_jobId].jobProvider);
    }

    function applyForJob(uint256 _applicantId, uint256 _jobId) external {
        require(applicants[_applicantId].isRegistered, "Applicant not registered");
        require(jobs[_jobId].isOpen, "Job not available");
        require(!applications[msg.sender][_jobId], "Application already submitted");

        applications[msg.sender][_jobId] = true;
        emit ApplicationSubmitted(_applicantId, _jobId);
    }

    function provideRating(uint256 _applicantId, uint256 _rating) external {
        require(applicants[_applicantId].isRegistered, "Applicant not registered");
        require(_rating >= 1 && _rating <= 5, "Invalid rating value");

        applicantRatings[_applicantId] = Rating(_applicantId, _rating);
        emit RatingProvided(_applicantId, _rating);
    }

    function getApplicantRating(uint256 _applicantId) external view returns (uint256) {
        return applicantRatings[_applicantId].rating;
    }
}
