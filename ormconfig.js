let config;

if (process.env.NODE_ENV === 'development') {
    config = {
        DATABASE_URL: 'mysql://root:2205@localhost:3306/tutor_on',
        DATABASE_USER: 'root',
        DATABASE_PASSWORD: '2205',
        DATABASE_NAME: 'tutor_on',
        DATABASE_HOST: 'localhost',
        DATABASE_PORT: 3306
    }
} else {
    config = {
        DATABASE_URL: 'mysql://LaOru8fzgQ:PWbmZyreL5@remotemysql.com:3306/LaOru8fzgQ',
        DATABASE_USER: 'LaOru8fzgQ',
        DATABASE_PASSWORD: 'PWbmZyreL5',
        DATABASE_NAME: 'LaOru8fzgQ',
        DATABASE_HOST: 'remotemysql.com',
        DATABASE_PORT: 3306
    }
}

module.exports = {
    "type": "mysql",
    "host": config.DATABASE_HOST,
    "port": config.DATABASE_PORT,
    "username": config.DATABASE_USER,
    "password": config.DATABASE_PASSWORD,
    "database": config.DATABASE_NAME,
    "synchronize": false,
    "logging": false,
    "seeds": [
        "../src/database/seeds/**/*.ts"
    ],
    "factories": [
        "../src/database/factories/**/*.ts"
    ],
    "entities": [
        "../src/database/entities/**/*.ts"
    ],
    "migrations": [
        "../src/database/migrations/**/*.ts"
    ],
    "subscribers": [
        "../src/database/subscribers/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "../src/database/entities",
        "migrationsDir": "../src/database/migrations",
        "subscribersDir": "../src/database/subscribers"
    }
};