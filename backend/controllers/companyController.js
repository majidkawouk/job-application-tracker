const company = require('../models/Companies'); 

exports.CreateCompany = async (req, res) => {
    const {name,website,headquarters_location} = req.body;
    try {
        const companyId = await company.CreateCompany({name,website,headquarters_location});
        res.status(201).json({ message: 'Company created successfully', companyId });
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).json({ message: 'Server error' });
    }

}
exports.DeleteCompany = async (req, res) => {
    const { company_id } = req.body;
   try {
        const deleted = await company.DeleteCompany(company_id);
        if (deleted) {
            res.status(200).json({ message: 'Company deleted successfully' });
        } else {
            res.status(404).json({ message: 'Company not found' });
        }
    } catch (error) {
        console.error('Error deleting company:', error);
        res.status(500).json({ message: 'Server error' });
    }
}