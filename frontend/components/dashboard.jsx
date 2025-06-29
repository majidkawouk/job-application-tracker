"use client";

import { useUser } from "./UserContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user } = useUser();
  const [applications, setApplications] = useState([]);
  const router = useRouter();
  

  useEffect(() => {
    const fetchApplications = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        router.push("/login");
        return;
      }

      const userObj = JSON.parse(storedUser);

      try {
        const response = await fetch(
          `http://localhost:3001/api/applications/${userObj.user_id}`
        );

        if (response.ok) {
          const data = await response.json();
          setApplications(data);
        } else {
          console.error("❌ Failed to fetch application data");
        }
      } catch (error) {
        console.error("❌ Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleUpdateApplicationStatus = async (applicationId, status) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/applications/${applicationId}/${status}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Application status updated:", data);

        setApplications((prevApps) =>
          prevApps.map((app) =>
            app.application_id === applicationId
              ? { ...app, status } 
              : app
          )
        );
      } else {
        const errorData = await response.json();
        console.error("❌ Failed to update application status:", errorData);
      }
    } catch (error) {
      console.error("❌ Error updating application status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {applications.length === 0 ? (
        <p className="text-center col-span-full text-xl text-gray-600">
          No applications found.
        </p>
      ) : (
        applications.map((app) => (
          <div
            key={app.application_id}
            className="bg-orange-400 text-black p-6 rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            <h2 className="text-xl font-bold mb-2">
              Application #{app.application_id}
            </h2>
            <hr className="bg-black p-1" />
            <p>
              Company Name: <strong>{app.name}</strong>
            </p>
            <p>
              Job Title: <strong>{app.job_title}</strong>
            </p>
            <p>
              Salary: <strong>${app.salary_expectation}</strong>
            </p>
            <p>
              Location: <strong>{app.job_location}</strong>
            </p>
            <p>
              Job URL:{" "}
              <a
                href={app.job_url}
                className="underline font-semibold text-blue-500 hover:text-blue-600"
                target="_blank"
              >
                {app.job_url}
              </a>
            </p>
            <p>
              Applied On:{" "}
              <strong>
                {app.application_date
                  ? new Date(app.application_date).toLocaleDateString("en-GB")
                  : "N/A"}
              </strong>
            </p>
            <p>
              Response Date:{" "}
              <strong>
                {app.response_date
                  ? new Date(app.response_date).toLocaleDateString("en-GB")
                  : "N/A"}
              </strong>
            </p>

            <p>
              Status: <strong>{app.status}</strong>
            </p>

            <div className="flex items-center gap-2 mt-4 text-lg">
              <button className="p-2 bg-red-500 text-black  rounded-md hover:bg-red-600">
                Remove
              </button>

              <select
                className="p-2 bg-green-400 rounded-md hover:scale-105 transition"
                value={app.status}
                onChange={(e) => {
                  handleUpdateApplicationStatus(
                    app.application_id,
                    e.target.value
                  );
                }}
              >
                <option value="Wishlist">Wishlist</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Applied">Applied</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
