const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUxvZGNPZTY0cFZjR1pIQVpCOVZjNnlLMXpWZjV1RUxZTVF6K2FoeHBXZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMjg4U2tTbmcxUDlwUkpZSHJpQzY3cHNaYnpQQUhUc2NJeXVJblZ0YXZrWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLTTJxQ2NxRVpvdWRNbmdPV3JvNWs2Um1NVmozL1JQWUM4ZjRuQUlGRW04PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvak1wdUxGbUhoQ21WK0l1cVh3K2E2enN0QjZIdUhkWHAxeWZmOG5pZ0NzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlMdWFBVWp3S21sQnJRT29uM1JEMVRJWHdsbnBVOUhJcmp0bCtIU0lPRzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRpVmxQaUpMVVVBRThSMmFXaUpoUGZ0WTVjdGt5MWNzMm9yZDZMTjVqVE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUhhMkp6ZURCVnhyNFlaRDhNeURWZjM2MHZpZm1jK2pnU0pnQUtYWm9sST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid056WnVXbUxTcXpOdUlrc01UaXVSQ2x6ZExWY0owTWp6bjIxSXEwNURUaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InB5QWtrK3FLTW5zd3FBM1RuSmxsck5jc3Q5QkFDWWxpZmlMelBoQlBVVnBGNDFOOHNXZHorNk1TS0pSLzkxS0hjMWZnNEN5azVzN0c5Z2dmNXJkZ0FBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM3LCJhZHZTZWNyZXRLZXkiOiI5eVZuRndRdGFYOVk4TnNpWFVTTTZGV0piOXNQdURaQ1Z5N2hYR1ZCZzJrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4OTA4NTUzM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJGNzVGMzM5MDVBNERFRTI2OUJBMDQ5RTZGRDEyOTIwMyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3MTg5MDg0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3ODkwODU1MzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQjY2MUMwNUUyRDdBQTQ2Nzk3QkJFMTJDOThCNzI4OUQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NzE4OTA4NH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzg5MDg1NTMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkQ5ODkxQjZCMjRDQjJBRTFENEFDRTAwOUIwNTk3NjJEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDcxODkwOTV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4OTA4NTUzM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwNzI0RDQyNDRBQkU5MkUxMzZFQjU2ODk4NUIxRTQ3RiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3MTg5MTEyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3ODkwODU1MzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRUJDRkQzRkQzRTQzRDlBMTlGMjEzMUU1RjJDMDRDRDYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NzE4OTExMn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoidmIzclpUQjhSMGlVdlF5OHJsR1lGQSIsInBob25lSWQiOiJhOGRiZmJhYS1mYjE3LTQwOGMtYWQ0OC1hMjcyYmZkOWFhYjkiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicEh5YSt5NEVHMGZPZHNIZFRRREkrRlhrWmJ3PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImwvR1BZbXpVa3RxOWE4Y21qajVuSnBsd1hzcz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJLSzVRVzZQUyIsIm1lIjp7ImlkIjoiMjYzNzg5MDg1NTMzOjJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2Qt/CdkLjihJXwnZC18J2ZivCdkYwifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09UTy9SWVF5UHFQd1FZWUVpQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjdmODBUT0Vpcjl6cEFsekpYcDFSV2hNSjBKakF1K21CNTliWk1zcXUzaGs9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im15Q0JWeWplOUhSZHlsWGdMR21HYjhtN1ZvdGtRc2prR3l1R0ZqZUNLZ1NibFM1aWpxZEFzUzdhRVdiTDQxWmNqc1N3SnNTb2pjeFd6andaeTZiNUJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJnVFNacUZacW9BMmtEb3RJcnFlMHZQSE5FMmtwMHlYSUJmcmtkMk1YcmZDanlMajlaSDFndHV1cDBMS0NBMEo2em1KZWtXQWpxb2tXSHRIUnZRN3NCUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4OTA4NTUzMzoyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmUzL05FemhJcS9jNlFKY3lWNmRVVm9UQ2RDWXdMdnBnZWZXMlRMS3J0NFoifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDcxODkwNzgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT3E1In0=',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "𝐷𝐸ℕ𝐵𝙊𝑌",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 𝙱.𝙼.𝙱-𝚇𝙼𝙳 ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '3',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
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
});

