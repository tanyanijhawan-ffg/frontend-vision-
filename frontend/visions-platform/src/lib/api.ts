export interface StudentListItem {
  id: string;
  name: string;
  email?: string;
  region: string;
  centre: string;
  class: string;
  gender: string;
  age: number;
  attendancePercent: number;
  academicScore: number;
  status: string;
  vulnerabilities: string[];
  district: string;
  date: string;
}

interface StudentApiRecord {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  joined_at?: string;
  center?: {
    id?: number;
    name?: string;
    district?: string;
    region?: string;
  };
  role?: {
    id?: number;
    name?: string;
  };
}

function getApiBaseUrl(): string {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  return "/api";
}

function mapStudentRecord(record: StudentApiRecord): StudentListItem {
  const fullName = [record.first_name, record.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

  const centerName = record.center?.name || "Unknown centre";
  const roleName = record.role?.name || "Student";
  const joinedAt = record.joined_at ? new Date(record.joined_at).toLocaleDateString("en-IN") : "Unknown";

  return {
    id: String(record.id),
    name: fullName || record.email || `Student ${record.id}`,
    email: record.email,
    region: record.center?.region || "Unknown region",
    centre: centerName,
    class: roleName,
    gender: "Unknown",
    age: 0,
    attendancePercent: 0,
    academicScore: 0,
    status: "Active",
    vulnerabilities: [],
    district: record.center?.district || "Unknown district",
    date: joinedAt,
  };
}

export async function fetchStudents(): Promise<StudentListItem[]> {
  const response = await fetch(`${getApiBaseUrl()}/students/`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load students (${response.status})`);
  }

  const payload = (await response.json()) as StudentApiRecord[] | { results?: StudentApiRecord[] };
  const records = Array.isArray(payload) ? payload : payload.results ?? [];

  return records.map(mapStudentRecord);
}
