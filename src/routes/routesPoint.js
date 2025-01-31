const adminRoutes = {
  dashboard: "/dashboard",
  manageUsers: "/manage-users",
  manageClasses: "/manage-classes",
  classDetail: "/class-detail/:classId",
};

const userRoutes = {
  home: "/user-home",
  profile: "/profile",
};

const authRoutes = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyOTP: "/verify-otp",
  emailOTP: "/email-otp",
  emailVerify: "/verify-email",
  verifyResetOTP: "/verify-reset-otp",
  setNewPassword: "/set-new-password",
};

export { adminRoutes, userRoutes, authRoutes };
