import { Text } from '@/components/nativewindui';
import { TextProps, View, ViewProps } from 'react-native';

export type FormElementProps = {
  label?: string;
  error?: string;
  children: React.ReactNode;
  labelProps?: TextProps;
} & ViewProps;

export const FormElement = ({
  label,
  error,
  children,
  labelProps = {},
  ...props
}: FormElementProps) => (
  <View className="flex-grow gap-1 mt-1 border-solid-1 border-black" {...props}>
    {label && (
      <Text variant="footnote" color="tertiary" {...labelProps}>
        {label}
      </Text>
    )}
    {children}
    <View style={{ minHeight: 18 }}>
      {error && (
        <Text variant="caption2" color={'error'}>
          {error}
        </Text>
      )}
    </View>
  </View>
);
