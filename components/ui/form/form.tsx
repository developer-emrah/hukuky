import { View, ViewProps } from 'react-native';

export const Form = (props: ViewProps) => <View className="gap-6" {...props} />;

const Group: React.FC<ViewProps> = (props) => (
  <View className="gap-4" {...props} />
);

Group.displayName = 'Form.Group';
Form.Group = Group;
