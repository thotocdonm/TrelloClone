import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Appbar, IconButton, TextInput, Icon } from 'react-native-paper';
import ThemedView from "../../shared/components/ThemedView";
import { useEffect, useState } from "react";
import { RootNavigationProp, RootRouteProp } from "../../types/types";
import { ScrollView } from "react-native-gesture-handler";
import { DatePickerInput } from 'react-native-paper-dates';
import cardService from "../../services/Board/cardService";
import { CardResponse } from "../../types/auth.type";
import { debounce } from "lodash";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const CardDetailScreen = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState('');
  const [cardName, setCardName] = useState<string>('');
  const navigation = useNavigation<RootNavigationProp<'CardDetail'>>();
  const param = useRoute<RootRouteProp<"CardDetail">>();
  const { cardId } = param.params;

  const [currentCard, setCurrentCard] = useState<CardResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const format = "DD/MM/YYYY HH:mm:ss"

  const handleGetCard = async () => {
    const res = await cardService.getById(cardId);
    console.log(res);
    if (res && res.code === "SUCCESS") {
      const data = res.data;
      setCurrentCard(data);
      setCardName(data.name);
      setDescription(data.description);

      const format = "DD/MM/YYYY HH:mm:ss";

      if (data.start_date) {
        setStartDate(dayjs(data.start_date, format).toDate());
      }

      if (data.end_date) {
        setEndDate(dayjs(data.end_date, format).toDate());
      }
    }
  };


  const debouncedUpdate = debounce(async (data) => {
    const res = await cardService.update(cardId, data);
    console.log('debounce', res)
    if (res) {
      handleGetCard();
    }
  }, 500);

  const handleUpdateCard = (field: string, value: any) => {
    console.log('update', field, value)
    const data = {
      start_date: value?.toLocaleDateString('en-GB') ?? startDate?.toLocaleDateString('en-GB'),
      end_date: value?.toLocaleDateString('en-GB') ?? endDate?.toLocaleDateString('en-GB'),
      name: cardName,
      description: description,
    };
    console.log(data)
    debouncedUpdate(data);
  };

  useEffect(() => {
    handleGetCard();
  }, [cardId])

  useEffect(() => {
    console.log('startDate formatted:', startDate?.toLocaleDateString('en-GB'));
  }, [startDate])

  useEffect(() => {
    console.log('end formatted:', endDate?.toLocaleDateString('en-GB'));
  }, [endDate])

  return (
    <ThemedView style={{ flex: 1, backgroundColor: "#1c1c1e" }}>
      <Appbar.Header>
        <Appbar.Action icon="close" onPress={() => navigation.goBack()} />
        {isEditing ? (
          <TextInput
            value={cardName}
            onChangeText={(e) => {
              setCardName(e)
              handleUpdateCard('name', cardName)
            }}
            onBlur={() => setIsEditing(false)}
            autoFocus
            style={{ flex: 1, backgroundColor: 'transparent', color: 'white' }}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            dense
          />
        ) : (
          <Appbar.Content
            title={cardName}
            onPress={() => setIsEditing(true)}
          />
        )}
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardRow}>
          <Icon source="format-align-left" size={20} />
          <TextInput
            style={styles.txtInput}
            mode="flat"
            label="Thêm mô tả thẻ"
            underlineColor="transparent"
            value={description}
            onChangeText={(e) => {
              setDescription(e)
              handleUpdateCard('description', description)
            }}
          />
        </View>
        <View style={[styles.cardRow, { flexDirection: 'column', alignItems: 'flex-start', gap: 20 }]}>
          <View style={styles.dateSection}>
            <Icon source="clock" size={20} />
            <View>
              <Text style={styles.label}>Ngày bắt đầu</Text>
              <DatePickerInput
                locale="en-GB"
                label="Start"
                value={startDate}
                onChange={(d) => {
                  setStartDate(d)
                  handleUpdateCard('start_date', d)
                }}
                inputMode="start"
                style={styles.dateInput}
              />
            </View>
          </View>

          <View style={styles.dateSection}>
            <Icon source="clock" size={20} />
            <View>
              <Text style={styles.label}>Ngày kết thúc</Text>
              <DatePickerInput
                locale="en-GB"
                label="End"
                value={endDate}
                onChange={(d) => {
                  setEndDate(d)
                  handleUpdateCard('end_date', d)
                }}
                inputMode="end"
                style={styles.dateInput}
              />
            </View>
          </View>
        </View>

        <View style={styles.cardRow}>
          <Icon source="file" size={20} />
          <Text style={styles.label}>Các tập tin đính kèm</Text>
          <IconButton icon="plus" size={20} style={styles.iconRight} onPress={() => { }} />
        </View>

        <View style={styles.cardRow}>
          <Icon source="sticker-check-outline" size={20} />
          <Text style={styles.label}>Danh sách các công việc</Text>
          <IconButton icon="plus" size={20} style={styles.iconRight} onPress={() => { }} />
        </View>

        <View style={[styles.cardRow, { backgroundColor: "transparent", borderWidth: 0 }]}>
          <Text style={styles.label}>Hoạt động</Text>
          <IconButton icon="dots-vertical" size={20} style={[styles.iconRight, { backgroundColor: "transparent" }]} onPress={() => { }} />
        </View>
      </ScrollView>

      {/* Fixed Bottom Comment Box */}
      <View style={styles.commentContainer}>
        <Icon source="sticker-check-outline" size={20} />
        <TextInput
          style={styles.commentInput}
          mode="outlined"
          label="Thêm nhận xét"
          placeholder="Type something"
        />
        <IconButton icon="file-upload" size={20} style={styles.iconRight} onPress={() => { }} />
      </View>
    </ThemedView>
  );
};

export default CardDetailScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
    paddingBottom: 100,
  },
  cardRow: {
    backgroundColor: "#2b2b2b",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  txtInput: {
    flex: 1,
    backgroundColor: "#2b2b2b",
  },
  label: {
    color: "white",
    fontSize: 16,
  },
  dateSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dateInput: {
    backgroundColor: "#2b2b2b",
    height: 36,
    width: 200,
  },
  iconRight: {
    backgroundColor: "#2b2b2b",
    marginLeft: "auto",
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#2b2b2b",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    gap: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#1c1c1e",
    borderRadius: 20,
  },
});
