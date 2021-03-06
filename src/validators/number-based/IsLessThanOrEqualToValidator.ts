import {PropertyValidator} from "../PropertyValidator";

/**
 * Validates if given number is less than or equal to the threshold value.
 *
 * @export
 * @class IsLessThanOrEqualToValidator
 * @implements {PropertyValidator<number>}
 */
export class IsLessThanOrEqualToValidator implements PropertyValidator<number> {

    constructor(private threshold: number) {
    }

    isValid(input: number): boolean {
        if (typeof input === "undefined" || input === null) {
            return false;
        }
        return input <= this.threshold;
    }
}