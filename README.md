# Silent Auction

## Endpoints

Base: https://silent-auction-be.herokuapp.com/

:userType = "bidders" or "sellers"

### Auth Routes

| Method | Type     | Endpoint                   | Send                                | Returns                                                                               |
| ------ | -------- | -------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------- |
| POST   | Register | /auth/register/`:userType` | See below                           | Message: `res.data.message`, Token: `res.data.token`, User object: `res.data.newUser` |
| POST   | Login    | /auth/login/`:userType`    | JSON with "username" and "password" | Message: `res.data.message`, Token: `res.data.token`, User object: `res.data.user`    |

Registration info:

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

## Restricted Routes

*Token must be sent to access*

| Method | Type        | Endpoint           | Send       | Returns              |
| ------ | ----------- | ------------------ | ---------- | -------------------- |
| POST   | Add Item    | /`:sellerId`/items | Item Info* | Message, Item object |
| PUT    | Update Item | /items/`:itemId`   | Item Info* | Message, Item object |
| DELETE | Delete Item | /items/`:itemId`   | Item ID    | Message              |

Item Info

- item_name - required
- description - required
- img_url - optional
- price - required

## Open Routes

| Method | Type                            | Endpoint               | Send             | Returns      |
| ------ | ------------------------------- | ---------------------- | ---------------- | ------------ |
| GET    | Get All Items                   | /api/items             | Just the request | Items Object |
| GET    | Get item with specified ID      | /api/items/`:id`       | Item ID          | Item Object  |
| Get    | Get items from specified Seller | /api/`:sellerId`/items | Seller ID        | Items Object |

## Deploy to Heroku

[Postgres and Heroku](https://www.youtube.com/watch?v=4WECh9OVvgk)