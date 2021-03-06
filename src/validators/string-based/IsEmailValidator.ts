import {PropertyValidator} from "../PropertyValidator";
import {EmailOptions} from "../../shared";
import * as validatorJS from "validator";

export class IsEmailValidator implements PropertyValidator<string> {

    constructor(private options?: EmailOptions) {
    }

    isValid(input: string): boolean {
        if (input) {
            return validatorJS.isEmail(input, this.options);
        }
        return false;
    }
}