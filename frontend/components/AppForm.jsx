"use client";

import { useState, useEffect } from "react";

export default function AppForm({ onCancel }) {
  const [companyId, setCompanyId] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");

  const [jobTitle, setJobTitle] = useState("");
  const [salaryExpectation, setSalaryExpectation] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const user = localStorage.getItem("user");
      if (!user) return;
      const userObj = JSON.parse(user);

      try {
        const response = await fetch(`http://localhost:3001/api/companies/${userObj.user_id}`);
        if (response.ok) {
          const data = await response.json();
          setCompanies(data);
        }
      } catch (error) {
        alert("Error fetching companies: " + error.message);
      }
    };

    fetchCompanies();
  }, []);

  const handleAddCompany = async (e) => {
    e.preventDefault();

    const user = localStorage.getItem("user");
    if (!user) return;
    const userObj = JSON.parse(user);

    const companyData = {
      user_id: userObj.user_id,
      name: newCompany,
      website: companyWebsite,
      headquarters_location: companyLocation,
    };

    try {
      const response = await fetch("http://localhost:3001/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(companyData),
      });

      if (response.ok) {
        const createdCompany = await response.json();

        if (!createdCompany.company_id) {
          alert("⚠️ Backend did not return company_id");
          return;
        }

        setCompanies((prev) => {
          const updated = [...prev, createdCompany];
          setCompanyId(createdCompany.company_id.toString());
          return updated;
        });

        setNewCompany("");
        setCompanyWebsite("");
        setCompanyLocation("");
        alert("✅ Company added");
      } else {
        const errorText = await response.text();
        alert("❌ Failed to add company: " + errorText);
      }
    } catch (error) {
      alert("❌ Error adding company: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = localStorage.getItem("user");
    if (!user) return;
    const userObj = JSON.parse(user);

    const data = {
      user_id: userObj.user_id,
      company_id: companyId || null,
      job_title: jobTitle,
      salary_expectation: Number(salaryExpectation) || 0,
      job_location: jobLocation,
      job_url: jobUrl,
      status: "pending",
    };

    try {
      const response = await fetch("http://localhost:3001/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("✅ Application added");
        onCancel();
      } else {
        const errorText = await response.text();
        alert("❌ Failed to add application: " + errorText);
      }
    } catch (error) {
      alert("❌ Error adding application: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Application</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Select Company</label>
        <select
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          required
          className="border border-gray-300 p-2 w-full"
        >
          <option value="">Select a company</option>
          {companies.map((company, index) => (
            <option
              key={company.company_id ?? `company-${index}`}
              value={company.company_id ?? ""}
            >
              {company.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">New Company Name</label>
        <input
          type="text"
          placeholder="Company Name"
          value={newCompany}
          onChange={(e) => setNewCompany(e.target.value)}
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Website</label>
        <input
          type="text"
          placeholder="https://example.com"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Headquarters Location</label>
        <input
          type="text"
          placeholder="City, Country"
          value={companyLocation}
          onChange={(e) => setCompanyLocation(e.target.value)}
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <button
        onClick={handleAddCompany}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Add Company
      </button>

      <hr className="my-6 border-gray-300" />

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Job Title</label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Salary Expectation</label>
        <input
          type="number"
          value={salaryExpectation}
          onChange={(e) => setSalaryExpectation(e.target.value)}
          required
          min="0"
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Job Location</label>
        <input
          type="text"
          value={jobLocation}
          onChange={(e) => setJobLocation(e.target.value)}
          required
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Job URL</label>
        <input
          type="url"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          required
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit Application
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
