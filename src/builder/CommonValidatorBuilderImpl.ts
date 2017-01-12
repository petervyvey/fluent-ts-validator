"use strict";

import {
    Validatable,
    LengthOptions,
    Severity,
    ValidationFailure
} from "../shared";

import {
    ValidationRule,
    UnlessCondition,
    WhenCondition
} from "../validation";

import {
    PropertyValidator
} from "../validators/PropertyValidator";

import {
    IsDefinedValidator,
    IsNullValidator,
    IsNotNullValidator,
    IsEmptyValidator,
    IsNotEmptyValidator,
    IsEqualValidator,
    IsNotEqualValidator,
    IsInValidator,
    IsNotInValidator
} from "../validators/common";

import {
    CommonValidatorBuilder,
    ValidationOptionsBuilder
} from "./";

export class CommonValidatorBuilderImpl<T, TProperty> implements
    ValidationOptionsBuilder<T>,
    CommonValidatorBuilder<T, TProperty> {

    constructor(protected validationRule: ValidationRule<T, TProperty | Iterable<TProperty>>) { }

    /*
    * ==================
    * Validation options
    * ==================
    */
    withErrorCode(errorCode: string): ValidationOptionsBuilder<T> {
        this.validationRule.setErrorCode(errorCode);

        return this;
    }
    withErrorMessage(errorMessage: string): ValidationOptionsBuilder<T> {
        this.validationRule.setErrorMessage(errorMessage);

        return this;
    }
    withSeverity(severity: Severity): ValidationOptionsBuilder<T> {
        this.validationRule.setSeverity(severity);

        return this;
    }
    withName(name: string): ValidationOptionsBuilder<T> {
        this.validationRule.setPropertyName(name);

        return this;
    }
    when(expression: (input: T) => boolean): ValidationOptionsBuilder<T> {
        this.validationRule.setCondition(new WhenCondition(expression));

        return this;
    }
    unless(expression: (input: T) => boolean): ValidationOptionsBuilder<T> {
        this.validationRule.setCondition(new UnlessCondition(expression));

        return this;
    }
    onFailure(callback: (failure: ValidationFailure) => void): ValidationOptionsBuilder<T> {
        this.validationRule.onFailure(callback);

        return this;
    }

    /*
    * =======================
    * Custom validation rules
    * =======================
    */
    addValidator(validator: Validatable<TProperty>): this {
        this.validationRule.addValidator({
            isValid: function (input: TProperty): boolean {
                return validator.validate(input).isValid();
            }
        });

        return this;
    }

    must(validationExpression: (input: TProperty) => boolean): this {
        this.validationRule.addValidator({
            isValid: function (input: TProperty): boolean {
                return validationExpression(input);
            }
        });

        return this;
    }

    /*
    * =======================
    * Common validation rules
    * =======================
    */
    isDefined(): this {
        this.validationRule.addValidator(new IsDefinedValidator());

        return this;
    }

    isNull(): this {
        this.validationRule.addValidator(new IsNullValidator());

        return this;
    }

    isNotNull(): this {
        this.validationRule.addValidator(new IsNotNullValidator());

        return this;
    }

    isEmpty(): this {
        this.validationRule.addValidator(new IsEmptyValidator());

        return this;
    }

    isNotEmpty(): this {
        this.validationRule.addValidator(new IsNotEmptyValidator());

        return this;
    }

    isEqualTo(comparison: TProperty): this {
        this.validationRule.addValidator(new IsEqualValidator(comparison));

        return this;
    }

    isNotEqualTo(comparison: TProperty): this {
        this.validationRule.addValidator(new IsNotEqualValidator(comparison));

        return this;
    }

    isIn(array: Array<TProperty>): this {
        this.validationRule.addValidator(new IsInValidator(array));

        return this;
    }

    isNotIn(array: Array<TProperty>): this {
        this.validationRule.addValidator(new IsNotInValidator(array));

        return this;
    }
}