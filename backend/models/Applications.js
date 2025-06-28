const db = require('../config/db');  // adjust path to where your db.js is located

async function findAllApplicationsbyId(userId) {
  const applications = await db.query('SELECT * FROM applications WHERE user_id = ?', [userId]);
  return applications;
}
async function createApplication(applicationData) {
  const { userId, companyId , jobtitle ,job_location ,job_url,status,salary_expectation } = applicationData;
  const result = await db.query('INSERT INTO applications (user_id, company_id, jobtitle, job_location, job_url, status, salary_expectation) VALUES (?, ?, ?, ?, ?, ?, ?)', [userId, companyId, jobtitle, job_location, job_url, status, salary_expectation]);
  return result.insertId;  // return the ID of the newly created application
}
async function deleteApplication(applicationid) {
  const result = await db.query('DELETE FROM applications WHERE id = ?', [applicationid]);
  return result.affectedRows > 0;  // return true if the application was deleted
}
async function updateApplicationStatus(applicationid, status) {
  const result = await db.query('UPDATE applications SET status = ? WHERE id = ?', [status, applicationid]);
  return result.affectedRows > 0;  // return true if the application was updated
}



module.exports = {
  findAllApplicationsbyId,
  createApplication,
  deleteApplication,
  updateApplicationStatus,
  // other model functions
};
