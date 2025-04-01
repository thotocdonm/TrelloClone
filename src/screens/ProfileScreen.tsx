import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";

type RouteParams = {
    name: string;
  };

const ProfileScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<{params:RouteParams}>>(); 
    const { name } = route.params || {};
    return (
        <View>
            <Text>This is {name}'s' profile</Text>
            <Text onPress={()=>navigation.goBack()}>Go Back</Text>
        </View>
    )
  };

  export default ProfileScreen