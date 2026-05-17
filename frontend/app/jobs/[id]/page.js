"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getSingleJob, updateJobStatus, deleteJob, STATUSES } from "@/lib/api";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchJob() {
      const res = await getSingleJob(id);
      if (res.success) {
        setJob(res.data);
      } else {
        setError(res.message || "Job not found");
      }
      setLoading(false);
    }
    fetchJob();
  }, [id]);

  async function handleStatusChange(e) {
    const newStatus = e.target.value;
    setStatusUpdating(true);
    const res = await updateJobStatus(id, newStatus);
    if (res.success) {
      setJob(res.data);
    }
    setStatusUpdating(false);
  }

  async function handleDelete() {
    setDeleting(true);
    const res = await deleteJob(id);
    if (res.success) {
      router.push("/");
    } else {
      alert(res.message || "Failed to delete");
      setDeleting(false);
    }
  }

  const statusColors = {
    Open: "bg-green-100 text-green-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Closed: "bg-gray-100 text-gray-500",
  };

  // Loading state
  if (loading) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="h-64 animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  // Error state
  if (error || !job) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-2xl mb-2">😕</p>
          <p className="font-semibold text-red-700">
            {error || "Job not found"}
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
          >
            ← Back to jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:underline">
          Jobs
        </Link>
        {" / "}
        <span className="text-gray-700">{job.title}</span>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* Status + Category badges */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[job.status]}`}
          >
            {job.status}
          </span>
          {job.category && (
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              {job.category}
            </span>
          )}
          {job.location && (
            <span className="ml-auto text-sm text-gray-500">
              📍 {job.location}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
        <p className="mt-1 text-xs text-gray-400">
          Posted{" "}
          {new Date(job.createdAt).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        {/* Description */}
        <p className="mt-5 leading-relaxed text-gray-700 whitespace-pre-wrap">
          {job.description}
        </p>

        {/* Contact info */}
        {(job.contactName || job.contactEmail) && (
          <div className="mt-6 rounded-lg bg-gray-50 p-4 text-sm">
            <p className="mb-1 font-medium text-gray-600">Contact</p>
            {job.contactName && (
              <p className="text-gray-700">{job.contactName}</p>
            )}
            {job.contactEmail && (
              <a
                href={`mailto:${job.contactEmail}`}
                className="text-blue-600 hover:underline"
              >
                {job.contactEmail}
              </a>
            )}
          </div>
        )}

        {/* Status update + Delete */}
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-6">
          {/* Status dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600">
              Update status:
            </label>
            <select
              value={job.status}
              onChange={handleStatusChange}
              disabled={statusUpdating}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {statusUpdating && (
              <span className="text-xs text-gray-400">Saving...</span>
            )}
          </div>

          {/* Delete button */}
          <div className="ml-auto flex items-center gap-2">
            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>
            ) : (
              <>
                <span className="text-sm font-medium text-red-600">
                  Are you sure?
                </span>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Yes, delete"}
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          ← Back to all jobs
        </Link>
      </div>
    </div>
  );
}
