# Silent Auction

## Endpoints

Base: https://silent-auction-be.herokuapp.com/

:userType = "bidders" or "sellers"

### Auth Routes

| Method | Type     | Endpoint                   | Send                                | Returns                                                                               |
| ------ | -------- | -------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------- |
| POST   | Register | /auth/register/`:userType` | See below                           | Message: `res.data.message`, Token: `res.data.token`, User object: `res.data.newUser` |
| POST   | Login    | /auth/login/`:userType`    | JSON with "username" and "password" | Message: `res.data.message`, Token: `res.data.token`, User object: `res.data.user`    |

Regisrations info:

| Bidder            | Seller            |
| ----------------- | ----------------- |
| firstName         | firstName         |
| lastName          | lastName          |
| email (unique)    | organization      |
| streetAddress     | email (unique)    |
| city              | streetAddress     |
| state             | city              |
| zipCode           | state             |
| username (unique) | zipCode           |
| password          | username (unique) |
|                   | password          |


## Deploy to Heroku

[Postgres and Heroku](https://www.youtube.com/watch?v=4WECh9OVvgk)