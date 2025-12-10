import Ajv, { ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';

export class SchemaValidator {
  private readonly ajv: Ajv;
  private validators: Map<string, ValidateFunction>;

  constructor() {
    this.ajv = new Ajv({ 
      allErrors: true,
      strict: false,
      validateFormats: true
    });
    addFormats(this.ajv);
    this.validators = new Map();
  }

  validate(schema: object, data: any): {
    valid: boolean;
    errors: any[] | null;
  } {
    const schemaKey = JSON.stringify(schema);
    
    let validator = this.validators.get(schemaKey);
    if (!validator) {
      validator = this.ajv.compile(schema);
      this.validators.set(schemaKey, validator);
    }

    const valid = validator(data);
    return {
      valid: valid as boolean,
      errors: validator.errors || null
    };
  }

  getErrorMessages(errors: any[] | null): string[] {
    if (!errors) return [];
    return errors.map(error => {
      const path = error.instancePath || 'root';
      return `${path}: ${error.message}`;
    });
  }
}

export const validator = new SchemaValidator();
