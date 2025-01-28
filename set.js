const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FoZXlmT2MwbVY2WHZkK1RacW1BU0J1NlQzaFRaZExtWkZwWmdWT25tND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN3FydW14TGQ4SGFHZm8zQTdsQlFOckgvUm9uSU1KdUo2UmdiRVBSQzdYYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBTU5QSFBXblR1YVRTQzNnbUdvOEZUTFRyVjZyMDZZZC8yWGNkSzJXODI4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkenN1VlpyT3JHSWx6MVdSa2ZNZlJTaG9VeVQ5VzdVajdmUVhOKzJMVUdzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVFdVZGeElVeE5hREErV3Q1QVZZSUVGNVA1RVduMUxOU2pNTEtFb2VxMWM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRYZnpRdk4xSFJBYzdoaUZNUjMyQm9NZ3dIa1VIRnNTZFc1R21BcDlzQnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0F5N0V3TDVYcWMrNzZZeFplTEx6dFdveXNNSGdTK28zYkpYOGFVQlpFQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSndLVjMrbUt6ZFdNMXRGVHEyVWNSaDlWTWhQZUpXQWdLbCtBV3YrWXdBbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRYSFdRVlk5Qm9zSFdPOUlCTnQ0cm4vRUFsRGEwUjdybHI4Mjk2cjBsaG5KejIyeTZseEFjQThFbzEwMDZleU5NQk5ycXVuMUwxaTNCaDZUWktyNkJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA4LCJhZHZTZWNyZXRLZXkiOiJNNTMxOUFUVFZqL2hmZzRVdzhPVkFvT0piSVFKcXBoQUpzeHZhOHY1TDBFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJWQUxYQURyR1RzQzJJbDV1X2tLZnFnIiwicGhvbmVJZCI6IjNkNzkxYjY5LWY5ZDctNDQ3Mi1hZWVkLTU3ZjIyYzVmY2UwNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1NW5taVZZSzZHQ25qY2VxcjM5eDhrL0JpK0E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmgrbmJEd0NrQStsaThUZ3BmRUlOd1FoenowPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IloyQ0NNUTg0IiwibWUiOnsiaWQiOiIyMzQ3MDQ1Mjk4MjI2OjY5QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlJvdGltaSBCcmlnaHQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tpZnI5d0ZFTnV6NUx3R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im1DZjFKeTBsVkh6dUIvUmljbXRPeVZTd3IrTzMrdnZwYnBFZDVUWTMvMjg9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjdTRFMrY2ZrRXMzbE5FV1lCdFg1WTR5NHNiNTI4bXdJSnpia2xzZ3VFaGFoNEQ2cTB5SURlbTJzUWYyeFQycVJ3NHRvTWFMNDJlZCtFT1ZzNnppcUFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJIOTNkT1FEVHhIYXl5dGJSVDYrMUQyRDRuYnlaNW10WkFmUm9ZdEl6UU5SdThSb3V4eVk5OVNERHNvSEhiOUhLTHc5U1dpSjUzTHBuc3FxWlNuajRCUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwNDUyOTgyMjY6NjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWmduOVNjdEpWUjg3Z2YwWW5KclRzbFVzSy9qdC9yNzZXNlJIZVUyTi85diJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczODA4Njg4OSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMR1YifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "🅑🅞🅓🅜🅐🅢",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 2347045298226",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/Q9yd9tR/IMG-20250117-WA0097.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
})
