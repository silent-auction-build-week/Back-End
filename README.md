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

| Bidder & Seller   |
| ----------------- |
| firstName         |
| lastName          |
| email (unique)    |
| streetAddress     |
| city              |
| state             |
| zipCode           |
| username (unique) |
| password          |
|                   |

## Restricted Routes

*Token must be sent to access*

| Method | Type           | Endpoint                        | Send                                           | Returns                    |
| ------ | -------------- | ------------------------------- | ---------------------------------------------- | -------------------------- |
| POST   | Add Item       | /`:sellerId`/items              | Item Info*                                     | Message, Item object       |
| PUT    | Update Item    | /items/`:itemId`                | Item Info*                                     | Message, Item object       |
| DELETE | Delete Item    | /items/`:itemId`                | Item ID                                        | Message                    |
|        |                |                                 |                                                |                            |
| Post   | Add Auction    | /`:sellerId`/`:itemId`/auctions | Seller ID, Item ID, auction_start, auction_end | message, newAuction object |
| Delete | Delete Auction | /auctions/`:auctionId`          | Auction ID                                     | Message                    |

Item Info

- item_name - required
- description - required
- img_url - optional
- price - required

## Open Routes

| Method | Type                            | Endpoint                  | Send             | Returns        |
| ------ | ------------------------------- | ------------------------- | ---------------- | -------------- |
| GET    | Get all Items                   | /api/items                | Just the request | Items Array    |
| GET    | Get item with specified ID      | /api/items/`:id`          | Item ID          | Item Array     |
| Get    | Get items from specified Seller | /api/`:sellerId`/items    | Seller ID        | Items Array    |
|        |                                 |                           |                  |                |
| Get    | Get all auctions                | /api/auctions             | Just the request | Auctions Array |
| Get    | Get specified auction           | /api/auctions/:id         | Seller ID        | Auctions Array |
| Get    | Get specified seller's auctions | /api/`:sellerId`/auctions | Auction ID       | Auction Array  |

## Deploy to Heroku

[Postgres and Heroku](https://www.youtube.com/watch?v=4WECh9OVvgk)

npx heroku run knex migrate:rollback -a (application name) ??
npx heroku run knex migrate:latest -a (application name)
npx heroku run knex seed:run -a (application name)
