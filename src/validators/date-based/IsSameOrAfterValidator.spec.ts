/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import { IsSameOrAfterValidator } from "./IsSameOrAfterValidator";

describe("IsSameOrAfterValidator", () => {
    describe("isValid()", () => {
        let validator: IsSameOrAfterValidator;
        const date = new Date(2016, 11, 24, 21, 33, 45, 673);

        beforeEach(() => {
            validator = new IsSameOrAfterValidator(date);
        });

        it("should return true if given date is equal to specified date", () => {
            let result = validator.isValid(new Date(2016, 11, 24, 21, 33, 45, 673));

            expect(result).toBeTruthy();
        });

        it("should return true if given date is after specified date", () => {
            const laterDate = new Date(2017, 0, 1);

            let result = validator.isValid(laterDate);

            expect(result).toBeTruthy();
        });

        it("should return false if given date is before specified date", () => {
            const previousDate = new Date(2015, 0, 1);

            let result = validator.isValid(previousDate);

            expect(result).toBeFalsy();
        });
    });
});