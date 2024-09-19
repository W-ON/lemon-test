import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cnpj } from 'cpf-cnpj-validator';
import { ValidationMessages } from './validation-messages';

@ValidatorConstraint({ name: 'isCNPJ', async: false })
export class IsCNPJConstraint implements ValidatorConstraintInterface {
  validate(text: string) {
    return cnpj.isValid(text);
  }

  defaultMessage() {
    return ValidationMessages.IS_CNPJ;
  }
}
