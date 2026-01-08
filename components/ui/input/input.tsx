import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { BaseInput, BaseInputProps } from './base-input';

export type InputProps<T extends FieldValues> = { hideError?: boolean } & Omit<
  BaseInputProps,
  'defaultValue'
> &
  UseControllerProps<T, FieldPath<T>>;

export const Input = <T extends FieldValues>({
  name,
  control,
  rules,
  shouldUnregister,
  hideError = false,
  ...props
}: InputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
    defaultValue: props?.defaultValue ?? undefined,
    disabled: props.disabled,
    shouldUnregister: shouldUnregister,
  });

  return (
    <BaseInput
      {...props}
      error={!hideError ? error?.message : undefined}
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
    />
  );
};
