import {Severity, ValidationFailure} from "../shared";
import {PropertyValidator} from "../validators/PropertyValidator";
import {RuleApplicationOutcome} from "./RuleApplicationOutcome";
import {ValidationCondition} from "./ValidationCondition";

const successfulOutcome = new RuleApplicationOutcome();

export class ValidationRule<T, TProperty> {

    protected validators: PropertyValidator<TProperty>[];
    protected propertyName: string;
    protected errorCode: string;
    protected errorMessage: string;
    protected severity: Severity;
    protected conditions: ValidationCondition<T>[];
    protected callback: (failure: ValidationFailure) => void;

    constructor(public lambdaExpression: (input: T) => TProperty) {
        this.validators = [];
        this.conditions = [];
        // the best way I could think of to get hold of the propertyName was via regex
        // (the identified propertyName will be used later to specify where a validation failure came from)
        // obviously, something like a native nameof-function in TypeScript would be way nicer
        // unfortunately, it does not exist yet
        let regexArray = lambdaExpression.toString().match("\\s+\\w+\\.(\\w+(\\.\\w+)*)");
        this.propertyName = regexArray && regexArray.length > 1 ? regexArray[1] : undefined;
        this.errorMessage = `${this.propertyName} is invalid`;
    }

    setPropertyName(propertyName: string) {
        this.propertyName = propertyName;
    }

    addValidator(validator: PropertyValidator<TProperty>) {
        this.validators.push(validator);
    }

    setErrorCode(errorCode: string) {
        this.errorCode = errorCode;
    }

    setErrorMessage(errorMessage: string) {
        this.errorMessage = errorMessage;
    }

    setSeverity(severity: Severity) {
        this.severity = severity;
    }

    addCondition(condition: ValidationCondition<T>) {
        if (condition) {
            this.conditions.push(condition);
        }
    }

    onFailure(callback: (failure: ValidationFailure) => void) {
        this.callback = callback;
    }

    apply(input: T): RuleApplicationOutcome {
        let propertyValue = this.lambdaExpression(input);

        if (this.isValid(input, propertyValue)) {
            return successfulOutcome;
        }

        let failure = this.createValidationFailure(input, propertyValue);

        this.invokeCallbackWith(failure);

        return new RuleApplicationOutcome(failure);
    }

    protected isValid(input: T, propertyValue: TProperty): boolean {
        return this.isNoValidationRequired(input) || this.allValidatorsAreValid(propertyValue);
    }

    protected isNoValidationRequired(input: T): boolean {
        return !this.isValidationRequired(input);
    }

    private isValidationRequired(input: T): boolean {
        return this.conditions.length === 0 || this.conditions.every(cond => cond.shouldDoValidation(input));
    }

    private allValidatorsAreValid(propertyValue: TProperty): boolean {
        return this.validators.every(validator => validator.isValid(propertyValue));
    }

    protected createValidationFailure(input: T, propertyValue: TProperty): ValidationFailure {
        return new ValidationFailure(input, this.propertyName, propertyValue, this.errorCode, this.errorMessage, this.severity);
    }

    protected invokeCallbackWith(failure: ValidationFailure) {
        if (this.callback) {
            this.callback(failure);
        }
    }
}
