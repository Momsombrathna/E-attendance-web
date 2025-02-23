import Dashboard from "../pages/admin/Dashboard";
import { decodedUserID, decodedToken } from "./config";

const auth = {
  login: "/auth/login",
  logout: `/auth/logout/${decodedUserID}`,
  register: "/auth/register",
  verifyOTP: "/auth/verify-otp",
  emailOTP: "/auth/email-otp",
  resetPassword: "/auth/pass-reset-req-otp",
  verifyOTPReset: "/auth/verify-pass-reset-otp",
  setNewPassword: "/auth/set-new-password",
};
const admin = {
  allUsers: "/admin/all-users",
  allClasses: "/admin/all-classes",
  allCards: "/admin/all-cards",
};
const users = {
  userDetail: `/user/get/${decodedUserID}`,
  deleteUser: `/user/delete/${decodedUserID}`,
  updateUser: `/user/update/${decodedUserID}`, //upload.single("profileImage"),

  getUser: (userId) => `/user/get/${userId}`,
};

const classEndpoints = {
  studentClass: `/class/get-students-class/${decodedUserID}`,
  classOwner: `/user/get-class-owner/${decodedUserID}`,
  studentCard: `/class/get-student-card/${decodedUserID}`,
  addClass: `/class/create-class/${decodedUserID}`,
  addStudentByCode: "/class/invite-by-code",

  addStudentToClass: (classId) => `/class/invite-student/${classId}`,
  deleteSingleClass: (classId) => `/class/delete-class/${classId}`,
  updateClass: (classId) => `/class/update-class/${classId}`,
  getClassById: (classId) => `/class/get-class/${classId}`, //upload.single("classImage"),
  kickStudentFromClass: (classId) => `/class/kick-student/${classId}`,
  leaveClass: (classId) => `/class/leave-class/${classId}`,
  generateClassCode: (classId) => `/class/refresh-code/${classId}`,
};

const card = {
  createCard: `/card/create-student-card/${decodedUserID}`,
  updateCard: `/card/update-student-card/${decodedUserID}`, //upload.single("profileImage"),
};

const attendance = {
  createTimeline: (classId) => `/attendance/create-timeline/${classId}`,
  updateTimeline: (attendanceId) => `/attendance/edit-timeline/${attendanceId}`,
  deleteTimeline: (attendanceId) =>
    `/attendance/delete-timeline/${attendanceId}`,
};

const methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const headers = {
  "Content-Type": "application/json",
  "auth-token": decodedToken,
};

const apiPoints = {
  auth,
  admin,
  users,
  classEndpoints,
  card,
  attendance,
  methods,
  headers,
};

export default apiPoints;
