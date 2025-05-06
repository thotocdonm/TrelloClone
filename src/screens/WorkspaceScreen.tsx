import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Provider as PaperProvider, Appbar } from 'react-native-paper';

const WorkspaceScreen = () => {
    const navigation = useNavigation<DrawerNavigationProp<any>>();

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header style={{ alignItems: 'center' }}>
                <Appbar.Action
                    icon="menu"
                    onPress={() => navigation.openDrawer()}
                />
                <Appbar.Content title="Your Workspace" />
                <Appbar.Action icon="magnify" />
                <Appbar.Action icon="bell" />
                <Appbar.Action icon="dots-vertical" />
            </Appbar.Header>

            <View style={{ width:"100%" ,}}>
                <Text>Trello Workspace</Text>
            </View>
        </View>
    )
};

export default WorkspaceScreen;