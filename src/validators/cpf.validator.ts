import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';
import { ValidationMessages } from './validation-messages';

@ValidatorConstraint({ name: 'isCPF', async: false })
export class IsCPFConstraint implements ValidatorConstraintInterface {
  validate(text: string) {
    return cpf.isValid(text);
  }

  defaultMessage() {
    return ValidationMessages.IS_CPF;
  }
}
