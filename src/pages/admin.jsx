import React, { useState } from "react";
import { useAuth } from '../../context/AuthContext'
const Admin = () => {
    const [industryName, setIndustryName] = useState("");
    const [jobs, setJobs] = useState([]);
    const [image, setImage] = useState(null);

    const { addIndustry } = useAuth()

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        addIndustry(industryName, jobs, image)
        // You can handle the form data here, e.g., send it to an API
        console.log("Submitted Data:", { industryName, jobs, image });
      };
    return (
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="industryName">Industry Name:</label>
          <input
            type="text"
            id="industryName"
            value={industryName}
            onChange={(e) => setIndustryName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="jobs">Jobs:</label>
          <input
            type="text"
            id="jobs"
            value={jobs.join(", ")} // Join array values with a comma and space
            onChange={(e) => setJobs(e.target.value.split(", "))} // Split input into an array
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
}

export default Admin;
