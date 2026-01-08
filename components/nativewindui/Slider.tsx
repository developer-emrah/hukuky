import { useColorScheme } from '@/lib/useColorScheme';
import { COLORS } from '@/theme/colors';
import RNSlider from '@react-native-community/slider';
import { Platform } from 'react-native';

function Slider({
  thumbTintColor,
  minimumTrackTintColor,
  maximumTrackTintColor,
  ...props
}: React.ComponentProps<typeof RNSlider>) {
  const { colors } = useColorScheme();
  return (
    <RNSlider
      thumbTintColor={
        (thumbTintColor ?? Platform.OS === 'ios')
          ? COLORS.white
          : colors.primary
      }
      minimumTrackTintColor={minimumTrackTintColor ?? colors.secondary}
      maximumTrackTintColor={
        (maximumTrackTintColor ?? Platform.OS === 'android')
          ? colors.primary
          : undefined
      }
      minimumValue={0}
      maximumValue={1}
      {...props}
    />
  );
}

export { Slider };
