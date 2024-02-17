const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const accessToken = req.cookies.jwt;
  const refreshToken = req.cookies.refreshToken;

  // Check if either token is missing
  if (!accessToken || !refreshToken) {
    return res.status(401).json({ message: 'Unauthorized - Missing Token(s)' });
  }

  try {
    // Verify the access token
    const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decodedAccessToken;

    // Check if the access token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedAccessToken.exp < currentTime) {
      // Access token is expired, attempt to refresh it using the refresh token
      const decodedRefreshToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      // Check if the refresh token is expired
      if (decodedRefreshToken.exp < currentTime) {
        return res
          .status(401)
          .json({ message: 'Unauthorized - Refresh Token Expired' });
      }

      // Refresh the access token (generate a new one)
      const newAccessToken = jwt.sign(
        { userId: decodedRefreshToken.userId },
        process.env.JWT_SECRET,
        {
          expiresIn: '15m', // Set the expiration time for the new access token (e.g., 15 minutes)
        }
      );

      // Set the new access token as a cookie
      res.cookie('jwt', newAccessToken, { httpOnly: true, secure: true });
    }

    // Continue with the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    return res.status(401).json({ message: 'Unauthorized - Invalid Token(s)' });
  }
};

module.exports = { authenticateUser };
