import { body, check } from "express-validator";

export const dataValidation = [
    body("items.*.registrationDate"),
    body("items.*.id"),
    body("items.*.activityDate")
]

