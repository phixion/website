const axios = require("axios");

const AUTH_URL = "https://accounts.spotify.com/api/token";
const API_URL = "https://api.spotify.com/v1";
const CLIENT_ID = "c8865740def44fffb1f057b2b36cf6b4";
const CLIENT_SECRET = "de80dce89b844d71b0cdae009750eb1a";
const USER_ID = "ridelore";

if (CLIENT_SECRET == null) {
  throw Error("SPOTIFY_CLIENT_SECRET not found");
}

async function getAccessToken() {
  const b64 = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  return (
    await axios({
      method: "POST",
      url: AUTH_URL,
      data: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${b64}`,
        "content-type": "application/x-www-form-urlencoded",
      },
    })
  ).data;
}

async function getPlaylists(token) {
  return (
    await axios({
      method: "GET",
      url: `${API_URL}/users/${USER_ID}/playlists`,
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      params: {
        limit: 50,
      },
    })
  ).data.items;
}

module.exports = async function fetchPlaylists() {
  if (process.env.ELEVENTY_ENV !== "production") {
    return [
      {
        name: "lofi bumps.",
        url: "https://open.spotify.com/playlist/2BDHkcucvuR6FaQPDlKWES",
        description: "",
        image:
          "https://i.scdn.co/image/ab67706c0000da84cd5ae25f04f54f7ada9fc021",
      },
      {
        name: "8bit, Retro, Chiptunes, Chipstyle, NES, Gameboy, C64",
        url: "https://open.spotify.com/playlist/4tbjVHBqKwT10vSPkUWoe7",
        description: "",
        image:
          "https://mosaic.scdn.co/300/ab67616d00001e02288f8bf3e3073252cc44d32cab67616d00001e02bbf0c1fa12b13b22126165b0ab67616d00001e02c453f29f3e02ad5b1a34e283ab67616d00001e02c864af73e34ac17c64d000db",
      },
      {
        name: "FloFilz's Favorites",
        url: "https://open.spotify.com/playlist/0XEEFYn8MQncn08P50WZmO",
        description: "",
        image:
          "https://i.scdn.co/image/ab67706c0000da84a7c5f3c1a0bc38b3729858ee",
      },
      {
        name: "Jazz Vibes",
        url: "https://open.spotify.com/playlist/37i9dQZF1DX0SM0LYsmbMT",
        description: "",
        image: "https://open.spotify.com/playlist/37i9dQZF1DX0SM0LYsmbMT",
      },
    ];
  }

  const { access_token: token } = await getAccessToken();

  const playlists = await getPlaylists(token);

  const relevantPlaylists = playlists
    .filter((p) => p.description.startsWith("@") && p.description.endsWith("@"))
    .map((p) => {
      return {
        name: p.name,
        url: p.external_urls.spotify,
        description: p.description.slice(1, p.description.length - 1).trim(),
        image: p.images[0].url,
      };
    });

  return relevantPlaylists;
};
