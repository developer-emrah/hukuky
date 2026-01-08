import { Ref, useEffect, useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { FormElement, FormElementProps } from '../form/form-element';

export type BaseInputProps = {
  type?: 'text' | 'number' | 'decimal';
  inputProps?: TextInputProps;
  onChangeText?: (text: string) => void;
} & Omit<FormElementProps, 'children'> &
  Pick<TextInputProps, 'value' | 'placeholder' | 'defaultValue'> & {
    ref?: Ref<TextInput>;
  };

export const BaseInput = ({
  label,
  error,
  type,
  value,
  defaultValue,
  onChangeText: onChangeTextProp,
  inputProps,
  ref,
  ...props
}: BaseInputProps) => {
  const [newValue, setNewValue] = useState(value?.toString());

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  const onChangeText = (text: string) => {
    if (type === 'number') {
      text = text.replace(/[^0-9]/g, '');
    }

    if (type === 'decimal') {
      text = text.replace(/[^0-9.,]/g, '');
      text = text.replace(/,/g, '.');
    }

    setNewValue(text);
    onChangeTextProp?.(text);
  };

  return (
    <FormElement label={label} error={error} {...props}>
      <TextInput
        style={{
          borderColor: error ? 'red' : 'grey',
          borderWidth: 0.5,
          flexGrow: 1,
          padding: 12,
          borderRadius: 8,
        }}
        ref={ref}
        keyboardType={
          type === 'decimal'
            ? 'decimal-pad'
            : type === 'number'
              ? 'number-pad'
              : 'default'
        }
        onChangeText={onChangeText}
        value={newValue}
        defaultValue={defaultValue}
        {...inputProps}
      />
    </FormElement>
  );
};
