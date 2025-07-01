const db = require('../config/db'); 
async function CreateCompany(companyData) {
  const { user_id, name, website, headquarters_location } = companyData;

  const result = await db.query(
    'INSERT INTO companies (user_id, name, website, headquarters_location) VALUES (?, ?, ?, ?)',
    [user_id, name, website, headquarters_location]
  );

  const insertId = result[0]?.insertId || result.insertId;

  return insertId;
}
    async function DeleteCompany(company_id) 
    {
        const result = await db.query('DELETE FROM companies WHERE id = ?', [company_id]);
        return result.affectedRows > 0;
    }
    async function getallcompaniesByid(user_id) {
        const result = await db.query(`select * from companies where user_id = ?`, [user_id]);
        return result;
    }


    module.exports = {
        CreateCompany,
        DeleteCompany,
        getallcompaniesByid
    };