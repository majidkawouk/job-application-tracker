const db = require('../config/db'); 
async function CreateCompany(companyData) 
    {
        const {name,website,headquarters_location} = companyData;
        const result = await db.query('INSERT INTO companies (name, website, headquarters_location) VALUES (?, ?, ?)', [name, website, headquarters_location]);
        return result.insertId;
    }
    async function DeleteCompany(company_id) 
    {
        const result = await db.query('DELETE FROM companies WHERE id = ?', [company_id]);
        return result.affectedRows > 0;
    }



    module.exports = {
        CreateCompany,
        DeleteCompany
    };