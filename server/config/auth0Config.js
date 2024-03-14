import {auth} from 'express-oauth2-jwt-bearer';

const jwtCheck = auth(
   { 
    audience:"http://localhost:8000",
    issuerBaseURL: "https://dev-yoj2e2mu5bmlatbn.us.auth0.com",
    tokenSigningAlg:"RS256"
})
export default jwtCheck;
