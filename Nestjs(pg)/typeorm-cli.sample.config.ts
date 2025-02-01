import { DataSource } from "typeorm";

export default new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "something",
    password: "something",
    database: "nestjs-blog-api",
    entities: ["**/*.entity.js"],
    migrations: ["migrations/*.js"]
});