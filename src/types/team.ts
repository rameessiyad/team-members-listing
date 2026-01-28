export type Status =
  | "Active"
  | "Inactive"
  | "Busy"
  | "Away"
  | "On Leave"
  | "Do Not Disturb"
  | "Terminated";

export interface TeamMember {
  id: string;
  name: string;
  username: string;
  avatar: string;
  role: string;
  email: string;
  status: Status[];
  teams: string[];
}
