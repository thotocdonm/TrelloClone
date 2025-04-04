import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import { RootNavigationProp, RootRouteProp } from "../types/types";

const ProfileScreen = () => {
    const navigation = useNavigation<RootNavigationProp<'Profile'>>();
    const route = useRoute<RootRouteProp<'Profile'>>(); 
    const { name } = route.params || {};
    return (
        <View>
            <Text>This is {name}'s' profile</Text>
            <Text onPress={()=>navigation.replace('Login')}>Go Back</Text>
        </View>
    )
  };

  export default ProfileScreen