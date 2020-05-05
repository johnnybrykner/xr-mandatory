const generateToken = async () => {
  let base64 = require("base-64");
  const spotifyData = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${base64.encode("")}`,
    },
    body: "grant_type=client_credentials",
  });
  let tokenObject = await spotifyData.json();
  if (tokenObject.access_token) {
    return tokenObject.access_token;
  }
};

const getArtistData = async (artistId, spotifyToken) => {
  const rawData = await fetch(
    "https://api.spotify.com/v1/artists/" + artistId,
    {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    }
  );
  const artistJson = await rawData.json();
  return artistJson;
};

module.exports = {
  generateToken,
  getArtistData,
};
