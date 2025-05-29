import { useNavigation } from "@react-navigation/native";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Provider as PaperProvider, Appbar, Button, IconButton, TextInput } from 'react-native-paper';
import ThemedView from "../../shared/components/ThemedView";
import ThemedText from "../../shared/components/ThemedText";
import { useState } from "react";
import { RootNavigationProp } from "../../types/types";

const WorkspaceScreen = () => {
    const drawerNavigation = useNavigation<DrawerNavigationProp<any>>();
    const navigation = useNavigation<RootNavigationProp<'Workspace'>>();

    const mockWorkspaceBoards = [
        {
            id: 1,
            created_at: '2025-05-09T14:30:00.000000Z',
            updated_at: '2025-05-09T14:45:00.000000Z',
            is_deleted: 0,
            name: 'Project Alpha',
            background_color: '#3498db',  // Trello Blue
            workspace_id: 1,
            workspace: {
                id: 1,
                name: 'Marketing Team',
                description: 'Workspace for the marketing team',
            },
        },
        {
            id: 2,
            created_at: '2025-05-10T09:15:00.000000Z',
            updated_at: '2025-05-10T09:30:00.000000Z',
            is_deleted: 0,
            name: 'Product Development',
            background_color: '#e74c3c',  // Red color for the second board
            workspace_id: 2,
            workspace: {
                id: 2,
                name: 'Engineering Team',
                description: 'Workspace for the engineering team',
            },
        },
    ];

    const styles = StyleSheet.create({
        boardContainer: {
            padding: 10,
            margin: 16,
            backgroundColor: mockWorkspaceBoards[0].background_color,
            overflow: 'hidden',
            borderRadius: 16
        },
        board: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: 10,
            overflow: "hidden",
            padding: 10
        },
        removeBorder: {
            borderWidth: 0,
            borderColor: 'transparent',
            elevation: 0, // Android shadow
            shadowColor: 'transparent', // iOS shadow
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
        },
        transparent: {
            backgroundColor: 'transparent',
        },
        createTableBtn: {
            position: 'absolute',
            bottom: 50, // space from the bottom
            right: 20,   // space from the left
            zIndex: 1000, // optional: ensures it's above other content
            backgroundColor: "#a28ff5",
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16
        },

    });

    const [cardContent, setCardContent] = useState('');
    const [isBoardVisible, setIsBoardVisible] = useState(false);
    const [listBoard, setListBoard] = useState<any>([]);
    const [listList, setListList] = useState<any>([]);
    const [listWorkspaceBoard, setListWorkspaceBoard] = useState<BoardResponse[]>([]);

    const [workspaceInfo, setWorkspaceInfor] = useState<any | null>(null);
    const [workspaceId, setWorkspaceId] = useState(route.params?.workspaceId ?? null);

    const [boardId, setBoardId] = useState<string | undefined>(undefined);
    const [listId, setListId] = useState<string | undefined>(undefined);
    const showModal = () => setIsBoardVisible(true);
    const hideModal = () => setIsBoardVisible(false);




    const handleGetBoardOptions = async () => {
        const res = await boardService.getList('/get', '', { workspaceId: workspaceId });
        if (res && res.code === "SUCCESS") {
            const boardOptions = res.data.map((board: any) => ({
                label: board.name,
                value: board.id,
            }));
            setListBoard(boardOptions)
            console.log(boardOptions, 'board options')
            console.log('workspace ID handleGetBoardOptions:', workspaceId)
        }
    }

    const handleGetListList = async (boardId: any) => {
        console.log(boardId, 'list')
        const res = await listService.getList('/get', '', { boardId: boardId });
        console.log(res);
        if (res && res.code === "SUCCESS") {
            const listOptions = res.data.map((list: any) => ({
                label: list.name,
                value: list.id,
            }));
            console.log(listOptions, 'list')
            setListList(listOptions)
        }
    }

    const handleAddCardShortcut = async () => {
        if (listId !== undefined) {
            try {
                const res = await cardService.create({ name: cardContent, listCard: listId });

                if (res && res.code === "SUCCESS") {
                    Alert.alert('Thành công', res.message || 'Thẻ đã được thêm.');
                    // Optionally reset input
                    setCardContent('');
                } else {
                    Alert.alert('Lỗi', res.message || 'Thêm thẻ thất bại.');
                }

            } catch (error) {
                console.error(error);
                Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm thẻ.');
            }
        } else {
            Alert.alert('Lỗi', 'Hãy chọn bảng và danh sách trước');
        }
    };

    const handleGetWorkspaceInfor = async (id: any) => {
        try {
            const res = await workspaceService.getById(id);
            if (res && res.code === "SUCCESS") {
                setWorkspaceInfor(res.data)
                // const id = res?.data?.workspace?.id;
                // setWorkspaceId(id);
                console.log(res.data)
                console.log('workspace ID handleGetWorkspaceInfor:', workspaceId)
                
            }
        } catch (e) {
            console.log(e)
            Alert.alert('Lỗi', 'Lấy dữ liệu thất bại');
        }
    }

    const handleGetUserWorkspace = async () => {
        try {
            const res = await workspaceService.getCurrentUserWorkspace();
            if (res && res.code === "SUCCESS") {
                setWorkspaceInfor(res.data[0])
                const id = res?.data[0]?.workspace?.id;
                setWorkspaceId(id);
                // setWorkspaceId(res?.data[0]?.workspace?.id)
            }
        } catch (e) {
            console.log(e)
            Alert.alert('Lỗi', 'Lấy dữ liệu không gian làm việc thất bại');
        }
    }

    const handleGetListBoard = async () => {
        if (workspaceId) {
            try {
                const res = await boardService.getListBoardByWorkspaceId('/get', '', { workspaceId: workspaceId })
                if (res && res.code === "SUCCESS") {
                    setListWorkspaceBoard(res.data)
                    console.log(res.data)
                    console.log('workspace ID handleGetListBoard:', workspaceId)
                }
            } catch (e) {
                console.log(e)
                Alert.alert('Lỗi', 'Lấy dữ liệu bảng thất bại');
            }
        }
    }

    useEffect(() => {
        if (!workspaceId) {
            handleGetUserWorkspace();
        }
    }, []);

    useEffect(() => {
        if (workspaceId) {
            handleGetWorkspaceInfor(workspaceId);
            handleGetListBoard();
            handleGetBoardOptions();
        }
        

    }, [workspaceId]);


    const [showAppbarTitle, setShowAppbarTitle] = useState(false);

    useEffect(() => {
        handleGetBoardOptions();

    }, [])

    useEffect(() => {
        handleGetListList(boardId);
    }, [boardId])


    const handleOnSelectBoard = (id: any) => {
        setListId(undefined);
        setBoardId(id);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAppbarTitle(true);
            console.log(workspaceInfo)
        }, 1000);

        return () => clearTimeout(timer);
    }, [workspaceInfo]);

    
    console.log('workspace name:', workspaceInfo?.name);

    return (
        <>
            <ThemedView style={{ flex: 1 }}>

                <Appbar.Header style={{ alignItems: 'center' }}>
                    <Appbar.Action
                        icon="menu"
                        onPress={() => drawerNavigation.openDrawer()}
                    />
                    {showAppbarTitle && (
                        <Appbar.Content title={workspaceInfo?.name ?? 'Your workspace'} />
                    )}
                    <Appbar.Action icon="magnify" onPress={()=>navigation.navigate("SearchWorkspace",{workspaceId:workspaceId})}/>
                    <Appbar.Action icon="bell" />
                    <Appbar.Action icon="dots-vertical" onPress={() => navigation.navigate("MemberWorkspace", {workspaceId:workspaceId, name: workspaceInfo?.name })}/>
                </Appbar.Header>

                <ThemedView style={{ width: "100%", height: '100%' }}>
                    <ThemedView style={styles.boardContainer}>
                        <ThemedView style={styles.board}>
                            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-start' }}>
                                <View>
                                    <ThemedText style={{ fontWeight: 'bold' }}>
                                        Board name
                                    </ThemedText>
                                    <ThemedText>
                                        Card name
                                    </ThemedText>
                                </View>


                                <IconButton
                                    icon='pencil'
                                    size={24}
                                    onPress={() => console.log('Pressed')}
                                    accessibilityLabel="Avatar button"
                                />
                            </View>
                            <ThemedView style={styles.transparent}>
                                <TextInput
                                    placeholder="Thêm thẻ"
                                    outlineStyle={{ borderRadius: 10, overflow: 'hidden', ...styles.removeBorder }}
                                    mode="outlined"
                                    value={cardContent}
                                    onChangeText={setCardContent}
                                    right={
                                        cardContent ? <TextInput.Icon icon="check" onPress={() => console.log('check clicked')} /> : null
                                    }
                                >

                                </TextInput>
                            </ThemedView>

                        </ThemedView>
                    </ThemedView>

                    <ThemedView style={{ backgroundColor: 'black', padding: 16, display: 'flex', alignItems: 'flex-start' }}>
                        <ThemedText>
                            Không gian làm việc của Nguyễn Minh Sơn
                        </ThemedText>
                    </ThemedView>

                    {
                        mockWorkspaceBoards && mockWorkspaceBoards.length > 0 &&
                        mockWorkspaceBoards.map(workspace => {
                            return (
                                <Pressable key={workspace.id} onPress={() => navigation.navigate('Board', { id: workspace.id })}>
                                    <ThemedView key={workspace.id} style={{ display: 'flex', gap: 20, alignItems: 'center', flexDirection: 'row', padding: 10 }}>
                                        <ThemedView style={{ backgroundColor: workspace.background_color, borderRadius: 3, overflow: 'hidden', width: 60, height: 40 }}>

                                        </ThemedView>
                                        <ThemedText>
                                            {workspace.name}
                                        </ThemedText>
                                    </ThemedView>
                                </Pressable>

                            )
                        })
                    }
                </ThemedView>

                <Button icon="plus" mode="contained" style={styles.createTableBtn} onPress={() => navigation.navigate('CreateBoard')}>
                    Tạo bảng
                </Button>
            </ThemedView>
        </>

    )
};

export default WorkspaceScreen;