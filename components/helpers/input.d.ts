import {Control, FieldValues, RegisterOptions} from 'react-hook-form';

export interface IOption {
  label: string;
  value: string;
  selected?: boolean;
  disabled?: boolean;
  image?: string;
}

export interface IExpenseOption {
  userName: string;
  value: string;
  amount: string;
  image: string;
  selected: boolean;
  disabled: boolean;
}

export interface IInputProps<T> {
  name: string;
  control: Control<any, any>;
  defaultValue?: T;
  error?: string;
  placeholder?: string;
  label?: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined;
  onChange?: (value: T) => void;
}
