/* 
  This script reads the `env` vars set from Netlify's UI 
  and generates a `.env` file as a build step
*/

const fs = require('fs');
const contents = 
`AXIOS_BASE_URL=${process.env.AXIOS_BASE_URL}
PASSWORD=${process.env.PASSWORD}`;

fs.writeFileSync('./.env', contents)