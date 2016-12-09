/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

"use strict";

import {
    ValidationRule
} from "../validation";

import {
    IsDefinedValidator,
    IsNullValidator,
    IsNotNullValidator,
    IsEmptyValidator,
    IsNotEmptyValidator,
    IsEqualValidator,
    IsNotEqualValidator,
    IsInValidator,
    IsNotInValidator,
    IsArrayValidator,
    IsBooleanValidator,
    IsDateValidator,
    IsNumberValidator,
    IsStringValidator
} from "../validators/common";

import { ValidatorBuilder } from "./ValidatorBuilder";
import { ValidatorBuilderImpl } from "./ValidatorBuilderImpl";

describe("ValidatorBuilderImpl", () => {

    let validationRule: ValidationRule<TestClass, string>;
    let validatorBuilder: ValidatorBuilder<TestClass, string>;

    beforeEach(() => {
        validationRule = new ValidationRule((input: TestClass) => { return input.property; });
        spyOn(validationRule, "setValidator");
        validatorBuilder = new ValidatorBuilderImpl(validationRule);
    });

    describe("isDefined()", () => {
        it("should set IsDefinedValidator to validation rule", () => {
            validatorBuilder.isDefined();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsDefinedValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isDefined();

            expect(result).not.toBeNull();
        });
    });

    describe("isNull()", () => {
        it("should set IsNullValidator to validation rule", () => {
            validatorBuilder.isNull();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsNullValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNull();

            expect(result).not.toBeNull();
        });
    });

    describe("isNotNull()", () => {
        it("should set IsNotNullValidator to validation rule", () => {
            validatorBuilder.isNotNull();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsNotNullValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNotNull();

            expect(result).not.toBeNull();
        });
    });

    describe("isEmpty()", () => {
        it("should set IsEmptyValidator to validation rule", () => {
            validatorBuilder.isEmpty();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsEmptyValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isEmpty();

            expect(result).not.toBeNull();
        });
    });

    describe("isNotEmpty()", () => {
        it("should set IsNotEmptyValidator to validation rule", () => {
            validatorBuilder.isNotEmpty();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsNotEmptyValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNotEmpty();

            expect(result).not.toBeNull();
        });
    });

    describe("isEqualTo()", () => {
        it("should set IsEqualValidator to validation rule", () => {
            validatorBuilder.isEqualTo("foo");

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsEqualValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isEqualTo("foo");

            expect(result).not.toBeNull();
        });
    });

    describe("isNotEqualTo()", () => {
        it("should set IsNotEqualValidator to validation rule", () => {
            validatorBuilder.isNotEqualTo("foo");

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsNotEqualValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNotEqualTo("foo");

            expect(result).not.toBeNull();
        });
    });

    describe("is()", () => {
        it("should set IsValidator to validation rule", () => {
            validatorBuilder.isIn(["allowed value"]);

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsInValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isIn(["allowed value"]);

            expect(result).not.toBeNull();
        });
    });

    describe("is()", () => {
        it("should set IsValidator to validation rule", () => {
            validatorBuilder.isNotIn(["element value"]);

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsNotInValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNotIn(["element value"]);

            expect(result).not.toBeNull();
        });
    });

    describe("isArray()", () => {
        it("should set IsValidator to validation rule", () => {
            validatorBuilder.isArray();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsArrayValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isArray();

            expect(result).not.toBeNull();
        });
    });

    describe("isBoolean()", () => {
        it("should set IsBooleanValidator to validation rule", () => {
            validatorBuilder.isBoolean();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsBooleanValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isBoolean();

            expect(result).not.toBeNull();
        });
    });

    describe("isDate()", () => {
        it("should set IsDateValidator to validation rule", () => {
            validatorBuilder.isDate();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsDateValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isDate();

            expect(result).not.toBeNull();
        });
    });

    describe("isNumber()", () => {
        it("should set IsNumberValidator to validation rule", () => {
            validatorBuilder.isNumber();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsNumberValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isNumber();

            expect(result).not.toBeNull();
        });
    });

    describe("isString()", () => {
        it("should set IsStringValidator to validation rule", () => {
            validatorBuilder.isString();

            expect(validationRule.setValidator).toHaveBeenCalledWith(jasmine.any(IsStringValidator));
        });

        it("should return new instance of a ValidationOptionsBuilder", () => {
            let result = validatorBuilder.isString();

            expect(result).not.toBeNull();
        });
    });
});

class TestClass {
    property: string;

    constructor(property: string) {
        this.property = property;
    }
}