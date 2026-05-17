const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function getAllJobs(category = "", status = "") {
  const query = new URLSearchParams();
  if (category) query.set("category", category);
  if (status) query.set("status", status);

  const res = await fetch(`${API_URL}/api/jobs?${query.toString()}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export async function getSingleJob(id) {
  const res = await fetch(`${API_URL}/api/jobs/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export async function createJob(jobData) {
  const res = await fetch(`${API_URL}/api/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jobData),
  });
  const data = await res.json();
  return data;
}

export async function updateJobStatus(id, status) {
  const res = await fetch(`${API_URL}/api/jobs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  return data;
}

export async function deleteJob(id) {
  const res = await fetch(`${API_URL}/api/jobs/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
}

export const CATEGORIES = ["Plumbing", "Electrical", "Painting", "Joinery", "Other"];
export const STATUSES = ["Open", "In Progress", "Closed"];