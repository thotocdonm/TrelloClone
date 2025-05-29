import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Alert, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Provider as PaperProvider,Icon, Appbar, Button, IconButton, TextInput, Portal, Modal } from 'react-native-paper';
import ThemedView from "../../shared/components/ThemedView";
import ThemedText from "../../shared/components/ThemedText";
import { use, useEffect, useState } from "react";
import { RootNavigationProp } from "../../types/types";
import { Dropdown } from "react-native-paper-dropdown";
import SearchWorkspaceService from "../../services/Workspace/searchinworkspace";
import listService from "../../services/Board/listService";
import boardService from "../../services/Board/boardService";
import cardService from "../../services/Board/cardService";
import Toast from "react-native-toast-message";
import { BoardResponse, WorkspaceResponse } from "../../types/auth.type";
import { set } from "lodash";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";



type WorkspaceScreenRouteProp = RouteProp<{
    AddMember: {user:any,workspaceId: number};
}, 'AddMember'>;


const AddMemberWorkspaceScreen = (props: any) => {
    const drawerNavigation = useNavigation<DrawerNavigationProp<any>>();
    const navigation = useNavigation<RootNavigationProp<'AddMember'>>();
    const cardNavigation = useNavigation<RootNavigationProp<'CardDetail'>>();

    const route = useRoute<WorkspaceScreenRouteProp>();
    const [users, setUsers] = useState<any[]>(route.params.user);
    const countUser = users.length;
    

    return (
        <>
            <ThemedView style={{ flex: 1 }}>
                <Appbar.Header style={{ alignItems: 'center' }}>
                    <Appbar.Action
                        icon="close"
                        onPress={() => navigation.goBack()}
                    />
                    <Appbar.Content title="Người cộng tác" />
                    <Pressable onPress={() => navigation.navigate("SearchUserToAdd", { workspaceId: route.params.workspaceId })} >
                        <ThemedText style={{marginLeft:30,textAlignVertical: 'center',textAlign: 'center', borderRadius: 3, overflow: 'hidden', width: 60, height: 40 , alignContent:'center'}}>Mời</ThemedText>
                       
                    </Pressable>
                </Appbar.Header>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingBottom:10, paddingTop:10 }}>
                    
                    <Text style={styles.label}>Người cộng tác  ({countUser})</Text>
                    </View>
                {users.map((user, index) => (
                    <View style={styles.cardRow}>
                    <View style={styles.memberInfoContainer}>
                        <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{user.username}</Text>
                        </View>

                        <View style={styles.nameContainer}>
                        <Text style={styles.fullName}>{user.last_name + ' ' + user.first_name}</Text>
                        <Text style={styles.username}>{user.email}</Text>
                        </View>

                        <Pressable style={styles.roleButton}>
                        <Text style={styles.roleText}>{user.role}</Text>
                        </Pressable>
                    </View>
                </View>))}
                
                
            </ThemedView>
            

            
        </>

    )
};

export default AddMemberWorkspaceScreen;

const getRandomColor = () => {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
    return colors[Math.floor(Math.random() * colors.length)];
    };

const styles = StyleSheet.create({
  label: {
    color: "white",
    fontSize: 16,
  },
  cardRow: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#1c1c1e',
  },
  memberInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: getRandomColor(),
    borderRadius: 999,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  nameContainer: {
    marginLeft: 10,
    flex: 1,
  },
  fullName: {
    color: 'white',
    fontWeight: 'bold',
  },
  username: {
    color: '#ccc',
    fontSize: 12,
  },
  roleButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  roleText: {
    color: 'white',
    fontSize: 12,
  },
});

