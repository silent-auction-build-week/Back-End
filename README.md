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

| Method   | Type               | Endpoint                                 | Send                                           | Returns                    |
| -------- | ------------------ | ---------------------------------------- | ---------------------------------------------- | -------------------------- |
| Items    |                    |                                          |                                                |                            |
| POST     | Add Item           | /`:sellerId`/items                       | Item Info*                                     | Message, Item object       |
| PUT      | Update Item        | /items/`:itemId`                         | Item Info*                                     | Message, Item object       |
| DELETE   | Delete Item        | /items/`:itemId`                         | Item ID                                        | Message                    |
| Auctions |                    |                                          |                                                |                            |
| Post     | Add Auction        | /`:sellerId`/`:itemId`/auctions          | Seller ID, Item ID, auction_start, auction_end | message, newAuction object |
| PUT      | Update auction_end | /auctions/`auctionId`                    | Auction ID                                     | Message                    |
| Delete   | Delete Auction     | /auctions/`:auctionId`                   | Auction ID                                     | Message                    |
| Users    |                    |                                          |                                                |                            |
| DELETE   | Removes User       | /api/sellers/`:id` or /api/bidders/`:id` | ID                                             | Message                    |

Item Info

- item_name - required
- description - required
- img_url - optional
- price - required

## Open Routes

| Method | Type                            | Endpoint                               | Send             | Returns        |
| ------ | ------------------------------- | -------------------------------------- | ---------------- | -------------- |
| GET    | Get all Items                   | /api/items                             | Just the request | Items Array    |
| GET    | Get item with specified ID      | /api/items/`:id`                       | Item ID          | Item Array     |
| GET    | Get items from specified Seller | /api/`:sellerId`/items                 | Seller ID        | Items Array    |
| GET    | Get all auctions                | /api/auctions                          | Just the request | Auctions Array |
| GET    | Get specified auction           | /api/auctions/:id                      | Seller ID        | Auctions Array |
| GET    | Get specified seller's auctions | /api/`:sellerId`/auctions              | Auction ID       | Auction Array  |
| GET    | Get all Bidders or Sellers      | /api/bidders, /api/sellers             | Just the request | Array          |
| GET    | Specific Bidder or Seller       | /api/bidders/`:id`, /api/sellers/`:id` | ID               | Array          |

## Deploy to Heroku

[Postgres and Heroku](https://www.youtube.com/watch?v=4WECh9OVvgk)

npx heroku run knex migrate:rollback -a (application name) ??
npx heroku run knex migrate:latest -a (application name)
npx heroku run knex seed:run -a (application name)
