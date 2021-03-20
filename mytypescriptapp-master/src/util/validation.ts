

// validation
    export interface validatable {
        value: string | number;
        required?: boolean; //optionalなプロパティ
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }


    export function validate(validationInput: validatable) {
        let isValid = true;
        //必須チェック
        if (validationInput.required) {
            isValid = isValid && validationInput.value.toString().trim().length !== 0;
        }

        if (validationInput.minLength != null &&
            typeof validationInput.value === 'string'
        ) {
            isValid = isValid && validationInput.value.length >= validationInput.minLength;
        }

        if (validationInput.maxLength != null &&
            typeof validationInput.value === 'string'
        ) {
            isValid = isValid && validationInput.value.length <= validationInput.maxLength;
        }

        if (validationInput.min != null &&
            typeof validationInput.value === 'number'
        ) {
            isValid = isValid && validationInput.value >= validationInput.min;
        }

        if (validationInput.max != null &&
            typeof validationInput.value === 'number'
        ) {
            isValid = isValid && validationInput.value <= validationInput.max;
        }

        return isValid;
    }

