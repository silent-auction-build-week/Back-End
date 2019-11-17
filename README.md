# Back-End

## Deploy to Heroku

[Postgres and Heroku](https://www.youtube.com/watch?v=4WECh9OVvgk)

[x] package.json --> "start": "node index.js"
[x] yarn add pg
[x] index.js --> dynamic port
[x] Heroku -->
      Project
        Resources
          Add-ons
            "Heroku Postgres"
              Hobby Dev - Free
                Provision
                  Settings
                    Reveal Config Vars
                      Copy DATABASE_URL key
[x] knexfile.js -->
  
    ```js
      production: {
      client: "pg",
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: "./data/migrations"
      },
      seeds: {
        directory: "./data/seeds"
      }
    }
    ```
[x]  Heroku -->
      Project
        Settings
          Reveal Config Vars
            Add key: DB_ENV (or whatever "environment" is set to in dbConfig.js)
              Add value: production
[] $ npx heroku run knex migrate:latest -a (application name)  // to create tables
[] $ npx heroku run knex seed:run -a (application name) // to seed tables
