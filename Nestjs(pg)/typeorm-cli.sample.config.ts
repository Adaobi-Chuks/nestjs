import { DataSource } from "typeorm";

export default new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "something",
    password: "something",
    database: "nestjs_blog_api",
    entities: ["**/*.entity.ts"],
    migrations: ["migrations/*.js"]
});