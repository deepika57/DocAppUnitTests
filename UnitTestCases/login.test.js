const user = require("../model/user");

test("verify user model", () => {
  expect(user.Usermodel).toBeDefined();
});

test("verify LoginPage", () => {
  expect(user).toBeDefined();
});

test("Verify username length", () => {
  expect(user.verifyUserName("amruthadeepika")).toBeTruthy();
});

test("Verify password length", () => {
  expect(user.verifyPassword("amrutha@123")).toBeTruthy();
});

test("Verify password length with less than 7 characters", () => {
  expect(user.verifyPassword("deep")).toBeFalsy();
});

test("Verify username length with less than 7 characters", () => {
  expect(user.verifyUserName("amru")).toBeFalsy();
});

test("Verify email", () => {
  expect(user.verifyEmail("amruthadeepika@gmail.com")).toBeTruthy();
});

test("Verify Email without @ charatcter", () => {
  expect(user.verifyEmail("amru")).toBeFalsy();
});

test("Verify Submit", () => {
  expect(user.submit()).toBeTruthy();
});

test("Verify change password", () => {
  expect(user.changePassword("amrutha@123")).toBeTruthy();
});

test("Verify Registered user", () => {
  expect(user.verifyRegisteredUser("amruthadeepika")).toBeTruthy();
});

test("Verify Unregistered user", () => {
  expect(user.verifyUnRegisteredUser("deepika")).toBeFalsy();
});
