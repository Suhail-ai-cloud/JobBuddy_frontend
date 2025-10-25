import React, { useEffect, useState } from "react";
import { getWorkers } from "../api/api";
import WorkerCard from "../components/WorkerCard";

export default function WorkersList() {
  const [workers, setWorkers] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");

  useEffect(() => {
    getWorkers().then((res) => setWorkers(res.results || []));
  }, []);

  const filteredWorkers = workers.filter((w) => {
    const matchesSearch =
      w.user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      w.skills.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = location
      ? w.user.location.toLowerCase().includes(location.toLowerCase())
      : true;
    const matchesSkill = skill
      ? w.skills.toLowerCase().includes(skill.toLowerCase())
      : true;
    return matchesSearch && matchesLocation && matchesSkill;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Find Workers</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or skill"
          className="border p-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by location"
          className="border p-2 rounded w-48"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by skill"
          className="border p-2 rounded w-48"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredWorkers.length > 0 ? (
          filteredWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))
        ) : (
          <p>No workers found.</p>
        )}
      </div>
    </div>
  );
}
