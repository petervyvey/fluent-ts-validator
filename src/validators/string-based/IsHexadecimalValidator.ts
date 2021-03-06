import {PropertyValidator} from "../PropertyValidator";
import * as validatorJS from "validator";

export class IsHexadecimalValidator implements PropertyValidator<string> {
    isValid(input: string): boolean {
        if (input) {
            return validatorJS.isHexadecimal(input);
        }
        return false;
    }
}