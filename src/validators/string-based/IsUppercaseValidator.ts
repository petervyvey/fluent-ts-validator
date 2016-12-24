"use strict";

import { PropertyValidator } from "../PropertyValidator";
import * as validatorJS from "validator";

export class IsUppercaseValidator implements PropertyValidator<string> {

    isValid(input: string): boolean {
        return validatorJS.isUppercase(input);
    }
}