function Logout() {
  localStorage.removeItem("user");
  window.location.href = "http://localhost:3000/login";
}

export default Logout;
