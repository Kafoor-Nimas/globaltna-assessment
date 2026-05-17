"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllJobs, CATEGORIES, STATUSES } from "@/lib/api";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  async function fetchJobs() {
    setLoading(true);
    const res = await getAllJobs(category, status);
    if (res.success) setJobs(res.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchJobs();
  }, [category, status]);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Requests</h1>
          <p className="mt-1 text-gray-500">
            Browse open trade jobs in your area
          </p>
        </div>
        {/* <Link
          href="/new-job"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Post a Job
        </Link> */}
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {(category || status) && (
          <button
            onClick={() => {
              setCategory("");
              setStatus("");
            }}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Loading  */}
      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && jobs.length === 0 && (
        <div className="py-20 text-center text-gray-500">
          <p className="text-4xl mb-3">📭</p>
          <p className="font-medium">No jobs found</p>
          <p className="text-sm mt-1">
            Try changing your filters or post the first request
          </p>
        </div>
      )}

      {/* Job Cards */}
      {!loading && jobs.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}

function JobCard({ job }) {
  const statusColors = {
    Open: "bg-green-100 text-green-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Closed: "bg-gray-100 text-gray-500",
  };

  return (
    <Link
      href={`/jobs/${job._id}`}
      className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[job.status]}`}
        >
          {job.status}
        </span>
        <span className="text-xs text-gray-400">{job.category}</span>
      </div>

      <h2 className="font-semibold text-gray-900 line-clamp-2">{job.title}</h2>
      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
        {job.description}
      </p>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        {job.location && <span>📍 {job.location}</span>}
        <span>
          {new Date(job.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </Link>
  );
}
