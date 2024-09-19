import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { ValidationMessages } from './validation-messages';

@ValidatorConstraint({ name: 'isCPFOrCNPJ', async: false })
export class IsCPFOrCNPJConstraint implements ValidatorConstraintInterface {
  validate(text: string) {
    return cpf.isValid(text) || cnpj.isValid(text);
  }

  defaultMessage() {
    return ValidationMessages.IS_CPF_OR_CNPJ;
  }
}
