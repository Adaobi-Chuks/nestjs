import { faker } from "@faker-js/faker/.";

export const completeUser = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: "Password123#"
};

export const missingFirstName = {
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
};

export const missingEmail = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    password: faker.internet.password()
};

export const missingPassword = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email()
};