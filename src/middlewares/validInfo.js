module.exports = (req, res, next) => {
  const { email, name, password, dob } = req.body;
  // RegEx function to validate email
  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }
  // RegEx function to validate password
  function validPassword(userPassword) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
      userPassword
    );
  }
  // Checking Signup route for valid info
  if (req.path === "/signup") {
    if (![email, name, password, dob].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    } else if (!validPassword(password)) {
      return res.status(401).json("Invalid Password");
    }
    // Checking Login route for valid info
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  }
  // expressing middleware function
  next();
};
