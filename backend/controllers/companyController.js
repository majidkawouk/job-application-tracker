const company = require('../models/Companies'); 

exports.CreateCompany = async (req, res) => {
  const { user_id, name, website, headquarters_location } = req.body;

  try {
    const company_id = await company.CreateCompany({
      user_id,
      name,
      website,
      headquarters_location,
    });

    res.status(201).json({
      company_id,
      name,
      website,
      headquarters_location,
      user_id,
    });
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.DeleteCompany = async (req, res) => {
    const { company_id } = req.params.id;
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

exports.getallcompaniesByid = async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const companies = await company.getallcompaniesByid(user_id);
        if(companies.length > 0) {
            res.status(200).json(companies);
        } else {
            res.status(404).json({ message: 'No companies found' });
        }
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
