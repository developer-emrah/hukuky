import * as Slot from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Platform,
  Pressable,
  PressableProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { Text, TextClassContext } from '@/components/nativewindui/Text';
import { cn } from '@/lib/cn';
import { useColorScheme } from '@/lib/useColorScheme';
import { COLORS } from '@/theme/colors';
import { withOpacity } from '@/theme/with-opacity';
import { ActivityIndicator } from './ActivityIndicator';

const buttonVariants = cva('flex-row items-center justify-center gap-2', {
  variants: {
    variant: {
      primary: 'ios:active:opacity-80 bg-secondary',
      secondary:
        'ios:border-primary ios:active:bg-primary/5 border border-foreground/40',
      tonal:
        'ios:bg-primary/10 dark:ios:bg-primary/10 ios:active:bg-primary/15 bg-primary/15 dark:bg-primary/30',
      plain: 'ios:active:opacity-70',
      destructive:
        'ios:bg-destructive/10 dark:ios:bg-destructive/10 ios:active:bg-destructive/20 bg-destructive/15 dark:bg-destructive/25 text-destructive border border-destructive/30 ios:border-destructive/40',
    },
    size: {
      none: '',
      sm: 'py-0.5 px-1.5 rounded-full',
      md: 'ios:rounded-lg py-1 ios:py-1.5 ios:px-2.5 px-3 rounded-full',
      lg: 'py-2 px-4 ios:py-2.0 rounded-xl gap-2',
      icon: 'ios:rounded-lg h-10 w-10 rounded-full',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

const androidRootVariants = cva('overflow-hidden', {
  variants: {
    size: {
      none: '',
      icon: 'rounded-full',
      sm: 'rounded-full',
      md: 'rounded-full',
      lg: 'rounded-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const buttonTextVariants = cva('font-medium', {
  variants: {
    variant: {
      primary: 'text-white',
      secondary: 'ios:text-primary text-foreground',
      tonal: 'ios:text-primary text-foreground',
      plain: 'text-foreground',
      destructive: 'text-destructive/70',
    },
    size: {
      none: '',
      icon: '',
      sm: 'text-[15px] leading-5',
      md: 'text-[17px] leading-7',
      lg: 'text-[17px] leading-7',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

const ANDROID_RIPPLE = {
  dark: {
    primary: {
      color: withOpacity(COLORS.dark.primary, 0.4),
      borderless: false,
    },
    secondary: {
      color: withOpacity(COLORS.dark.secondary, 0.8),
      borderless: false,
    },
    plain: { color: withOpacity(COLORS.dark.grey5, 0.8), borderless: false },
    tonal: { color: withOpacity(COLORS.dark.grey5, 0.8), borderless: false },
    destructive: { color: withOpacity(COLORS.dark.destructive, 0.8) },
  },
  light: {
    primary: {
      color: withOpacity(COLORS.light.primary, 0.4),
      borderless: false,
    },
    secondary: {
      color: withOpacity(COLORS.light.secondary, 0.4),
      borderless: false,
    },
    plain: { color: withOpacity(COLORS.light.grey5, 0.4), borderless: false },
    tonal: { color: withOpacity(COLORS.light.grey6, 0.4), borderless: false },
    destructive: { color: withOpacity(COLORS.light.destructive, 0.4) },
  },
};

// Add as class when possible: https://github.com/marklawlor/nativewind/issues/522
const BORDER_CURVE: ViewStyle = {
  borderCurve: 'continuous',
};

type ButtonVariantProps = Omit<
  VariantProps<typeof buttonVariants>,
  'variant'
> & {
  variant?: Exclude<VariantProps<typeof buttonVariants>['variant'], null>;
};

type AndroidOnlyButtonProps = {
  /**
   * ANDROID ONLY: The class name of root responsible for hidding the ripple overflow.
   */
  androidRootClassName?: string;
};

type ButtonProps = {
  text?: string;
  loading?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  children?: React.ReactNode;
} & PressableProps &
  ButtonVariantProps &
  AndroidOnlyButtonProps;

const Root = Platform.OS === 'android' ? View : Slot.Pressable;

const Adornment = (props: ViewProps) => {
  return <View className="absolute inset-y-0 justify-center" {...props} />;
};

function Button({
  startAdornment,
  endAdornment,
  className,
  variant = 'primary',
  text,
  loading,
  size,
  style = BORDER_CURVE,
  androidRootClassName,
  children,
  ...props
}: ButtonProps) {
  const { colorScheme } = useColorScheme();

  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Root
        className={Platform.select({
          ios: undefined,
          default: androidRootVariants({
            size,
            className: androidRootClassName,
          }),
        })}
      >
        <Pressable
          disabled={loading}
          className={cn(
            props.disabled && 'opacity-50',
            buttonVariants({ variant, size, className }),
          )}
          style={style}
          android_ripple={ANDROID_RIPPLE[colorScheme][variant]}
          {...props}
        >
          {startAdornment && (
            <Adornment
              className={cn(
                size === 'sm' && 'left-3',
                size === 'md' && 'left-4',
                size === 'lg' && 'left-5',
                size === 'icon' && 'left-0',
              )}
            >
              {startAdornment}
            </Adornment>
          )}
          {loading && <ActivityIndicator />}
          {text ? <Text>{text}</Text> : children}

          {endAdornment && (
            <Adornment
              className={cn(
                size === 'sm' && 'left-3',
                size === 'md' && 'left-4',
                size === 'lg' && 'left-5',
                size === 'icon' && 'left-0',
              )}
            >
              {endAdornment}
            </Adornment>
          )}
        </Pressable>
      </Root>
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
