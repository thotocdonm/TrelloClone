import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import { RootNavigationProp, RootRouteProp } from "../types/types";
import { clearTokens } from "../services/Auth/tokenService";
import { useAuthStore } from "../store/authStore";

const ProfileScreen = () => {
    const navigation = useNavigation<RootNavigationProp<'Profile'>>();
    const route = useRoute<RootRouteProp<'Profile'>>(); 
    const { name } = route.params || {};
const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

      const handleLogout = async () => {
        await clearTokens();
        setIsAuthenticated(false)
        
      }
    return (
        <View>
            <Text>This is {name}'s' profile</Text>
            <Text onPress={handleLogout}>Log Out</Text>
        </View>
    )
  };

  export default ProfileScreen