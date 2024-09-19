export const ValidationMessages = {
  IS_DOCUMENT_STRING: 'O número do documento deve ser uma string.',
  IS_CPF_OR_CNPJ: 'O número do documento deve ser um CPF ou CNPJ válido.',
  IS_CPF: 'O número do documento deve ser um CPF válido.',
  IS_CNPJ: 'O número do documento deve ser um CNPJ válido.',

  INVALID_CONNECTION_TYPE: (validValues: string) =>
    `O tipo de conexão deve ser um dos seguintes valores: ${validValues}.`,

  INVALID_CONSUMPTION_CLASS: (validValues: string) =>
    `A classe de consumo deve ser um dos seguintes valores: ${validValues}.`,

  INVALID_RATE_MODALITY: (validValues: string) =>
    `A modalidade tarifária deve ser um dos seguintes valores: ${validValues}.`,

  IS_ARRAY: 'O histórico de consumo deve ser um array.',
  ARRAY_MIN_SIZE: 'O histórico de consumo deve conter pelo menos 3 itens.',
  ARRAY_MAX_SIZE: 'O histórico de consumo deve conter no máximo 12 itens.',
  IS_INT: 'Cada item do histórico de consumo deve ser um número inteiro.',
  MIN_VALUE: 'Cada item do histórico de consumo deve ser no mínimo 0.',
  MAX_VALUE: 'Cada item do histórico de consumo deve ser no máximo 9999.',
};
