const db = require('../config/db');  

async function findAllApplicationsbyId(userId) {
const applications = await db.query(
  'SELECT * FROM applications INNER JOIN companies ON applications.company_id = companies.company_id WHERE applications.user_id = ?',
  [userId]
);
  return applications;
}
async function createApplication(applicationData) {
  const { user_id, company_id, job_title, job_location, job_url, status, salary_expectation } = applicationData;
  const result = await db.query('INSERT INTO applications (user_id, company_id, job_title, job_location, job_url, status, salary_expectation) VALUES (?, ?, ?, ?, ?, ?, ?)', [user_id, company_id, job_title, job_location, job_url, status, salary_expectation]);
  return result.insertId; 
}
async function deleteApplication(application_id) {
  const result = await db.query('DELETE FROM applications WHERE application_id= ?', [application_id]);
  return result.affectedRows > 0; 
}
async function updateApplicationStatus(application_id, status) {
  const result = await db.query('UPDATE applications SET status = ? WHERE application_id = ?', [status, application_id]);
  return result.affectedRows > 0;  
}



module.exports = {
  findAllApplicationsbyId,
  createApplication,
  deleteApplication,
  updateApplicationStatus,
};
