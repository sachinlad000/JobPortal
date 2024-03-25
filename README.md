# JobPortal
Overview
The JobPortal smart contract is a decentralized application (DApp) designed to facilitate job management, applicant registration, application submission, and applicant rating on the Ethereum blockchain. It allows an administrator to add and manage both job postings and job applicants, as well as track applicant ratings. The contract leverages the Ethereum blockchain's transparency and security features to create a trustless job portal system.

Key Features
1. Administrator Control
Administrator Address: The contract designates an administrator, whose address is stored in the admin variable. This ensures that certain critical functions can only be executed by the designated administrator.

onlyAdmin Modifier: The onlyAdmin modifier restricts access to functions, ensuring that they can only be called by the administrator. This adds an additional layer of security to functions that modify the state of the contract.

2. Applicant and Job Management
Applicant Struct: The Applicant struct stores essential information about job applicants, including an ID, name, labor history, application type, and registration status.

Job Struct: The Job struct holds details about job postings, such as job ID, title, description, salary, the provider's address, and whether the job is open.

ApplicationType Enumeration: The ApplicationType enumeration categorizes job applications into three types: Unskilled, SemiSkilled, and Skilled.

Mappings for Storage: Various mappings (applicants, jobs, applications, and applicantRatings) are employed to efficiently store and retrieve information about applicants, jobs, application status, and applicant ratings.

3. Events
Event Emission: The contract emits events (ApplicantAdded, JobAdded, ApplicationSubmitted, and RatingProvided) to log important actions. These events can be observed by external applications or interfaces to track changes on the blockchain.




4. Application Workflow
addApplicant Function: The administrator can add new applicants to the system using this function, providing necessary details such as ID, name, labor history, and application type.

addJob Function: The administrator can add new job postings, specifying the job ID, title, description, and salary.

applyForJob Function: Applicants can submit applications for specific jobs, and the contract ensures that only registered applicants can apply, the job is available, and the applicant has not already submitted an application.

5. Rating System
provideRating Function: The administrator can assign ratings to applicants, with the contract validating that the applicant is registered and the rating falls within a valid range (1 to 5).

getApplicantRating Function: Applicants or external observers can retrieve the rating given to a specific applicant based on their ID.

Conclusion
The JobPortal smart contract demonstrates the power of blockchain technology in creating transparent and decentralized systems for managing job-related processes. By leveraging smart contracts, the JobPortal enhances trust, security, and efficiency in the job application and recruitment ecosystem on the Ethereum blockchain.

