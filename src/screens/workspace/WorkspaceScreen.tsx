import { useNavigation } from "@react-navigation/native";
import { Alert, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Provider as PaperProvider, Appbar, Button, IconButton, TextInput, Portal, Modal } from 'react-native-paper';
import ThemedView from "../../shared/components/ThemedView";
import ThemedText from "../../shared/components/ThemedText";
import { useEffect, useState } from "react";
import { RootNavigationProp } from "../../types/types";
import { Dropdown } from "react-native-paper-dropdown";
import workspaceService from "../../services/Workspace/workspaceService";
import listService from "../../services/Board/listService";
import boardService from "../../services/Board/boardService";
import cardService from "../../services/Board/cardService";
import Toast from "react-native-toast-message";

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
        modal: {
            backgroundColor: 'rgb(0, 0, 0)',
            paddingHorizontal: 20,
            width: '80%',
            alignSelf: 'center', // Centers horizontally
            marginTop: 'auto', // Centers vertically with marginBottom
            marginBottom: 'auto',
        }

    });

    const [cardContent, setCardContent] = useState('');
    const [isBoardVisible, setIsBoardVisible] = useState(false);
    const [listBoard, setListBoard] = useState<any>([]);
    const [listList, setListList] = useState<any>([]);

    const [boardId, setBoardId] = useState<string | undefined>(undefined);
    const [listId, setListId] = useState<string | undefined>(undefined);
    const showModal = () => setIsBoardVisible(true);
    const hideModal = () => setIsBoardVisible(false);

    useEffect(() => {
        handleGetBoardList();
    }, [])

    useEffect(() => {
        handleGetListList(boardId);
    }, [boardId])


    const handleOnSelectBoard = (id: any) => {
        setListId(undefined);
        setBoardId(id);
    }

    const handleGetBoardList = async () => {
        const res = await boardService.getList('/get', '', { workspaceId: 8 });
        if (res && res.code === "SUCCESS") {
            const boardOptions = res.data.map((board: any) => ({
                label: board.name,
                value: board.id,
            }));
            setListBoard(boardOptions)
            console.log(boardOptions)
        }
    }

    const handleGetListList = async (boardId: any) => {
        const res = await listService.getList('/get', '', { boardId: boardId });
        if (res && res.code === "SUCCESS") {
            const listOptions = res.data.map((list: any) => ({
                label: list.name,
                value: list.id,
            }));
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



    return (
        <>
            <ThemedView style={{ flex: 1 }}>

                <Appbar.Header style={{ alignItems: 'center' }}>
                    <Appbar.Action
                        icon="menu"
                        onPress={() => drawerNavigation.openDrawer()}
                    />
                    <Appbar.Content title="Your Workspace" />
                    <Appbar.Action icon="magnify" />
                    <Appbar.Action icon="bell" />
                    <Appbar.Action icon="dots-vertical" />
                </Appbar.Header>

                <ThemedView style={{ width: "100%", height: '100%' }}>
                    <ThemedView style={styles.boardContainer}>
                        <ThemedView style={styles.board}>
                            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-start' }}>
                                <View>
                                    <ThemedText style={{ fontWeight: 'bold' }}>
                                        {listBoard.find((item: any) => item.value === boardId)?.label || "Board name"}
                                    </ThemedText>
                                    <ThemedText>
                                        {listList.find((item: any) => item.value === listId)?.label || "List name"}
                                    </ThemedText>
                                </View>


                                <IconButton
                                    icon='pencil'
                                    size={24}
                                    onPress={showModal}
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
                                        cardContent ? <TextInput.Icon icon="check" color='green' onPress={() => handleAddCardShortcut()} /> : null
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

            <Portal>
                <Modal visible={isBoardVisible} onDismiss={hideModal} contentContainerStyle={styles.modal} theme={{ colors: { primary: '#0079BF' } }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderBottomColor: '#ccc',
                        }}
                    >
                        <IconButton
                            icon="close"
                            size={24}
                            onPress={hideModal}
                            accessibilityLabel="Close modal"
                        />
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Thay đổi vị trí</Text>
                        <IconButton
                            icon="check"
                            size={24}
                            onPress={hideModal}
                            accessibilityLabel="Confirm action"
                        />
                    </View>
                    <View style={{ paddingVertical: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <Dropdown
                            mode="flat"
                            label="Đến"
                            placeholder="Bảng"
                            options={listBoard}
                            value={boardId}
                            onSelect={(id) => (handleOnSelectBoard(id))}
                            hideMenuHeader={true}
                        />
                        <Dropdown
                            mode="flat"
                            label="Danh sách"
                            placeholder="Danh sách"
                            options={listList}
                            value={listId}
                            onSelect={setListId}
                            hideMenuHeader={true}
                        />
                    </View>
                </Modal>
            </Portal>
        </>

    )
};

export default WorkspaceScreen;