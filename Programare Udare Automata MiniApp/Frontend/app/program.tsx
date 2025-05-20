import React, { useMemo, useState } from "react";
import {
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

interface MarkedDates {
  [key: string]: { selected: boolean; selectedColor: string };
}

interface ScheduleItem {
  date: string;
  hour: number;
  minute: number;
  duration: number;
}

const Program = () => {
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [hour, setHour] = useState<string>("");
  const [minute, setMinute] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  const selectedDates = useMemo(() => {
    return Object.keys(markedDates);
  }, [markedDates]);

  const generateSchedule = () => {
    if (!hour || !minute || !duration || selectedDates.length === 0) {
      alert("Please fill all fields and select at least one date");
      return;
    }

    const schedule: ScheduleItem[] = selectedDates.map((date) => ({
      date,
      hour: parseInt(hour),
      minute: parseInt(minute),
      duration: parseInt(duration),
    }));

    console.log(schedule);
    return schedule;
  };

  const onDayPress = (day: { dateString: string }) => {
    const updatedMarkedDates = { ...markedDates };

    if (updatedMarkedDates[day.dateString]) {
      delete updatedMarkedDates[day.dateString];
    } else {
      updatedMarkedDates[day.dateString] = {
        selected: true,
        selectedColor: "#8DD8FF",
      };
    }

    setMarkedDates(updatedMarkedDates);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <View style={styles.calendarBox}>
          <Calendar
            style={styles.calendar}
            onDayPress={onDayPress}
            markedDates={markedDates}
          />
          <View style={styles.inputs}>
            <View>
              <Text>Time</Text>
              <View style={styles.twoInputs}>
                <TextInput
                  style={styles.input}
                  value={hour}
                  onChangeText={setHour}
                  placeholder="Hour (0-23)"
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  value={minute}
                  onChangeText={setMinute}
                  placeholder="Minute (0-59)"
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View>
              <Text>Duration</Text>
              <TextInput
                style={styles.input}
                value={duration}
                onChangeText={setDuration}
                placeholder="Duration in minutes"
                keyboardType="numeric"
              />
            </View>
          </View>
          <TouchableOpacity onPress={generateSchedule}>
            <Text>Generate Schedule</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  calendar: {
    paddingBottom: 20,
    borderRadius: 30,
    boxShadow: "1px 3px 5px #9E9E9E",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: 50,
    textAlign:'center',
  },
  calendarBox: {
    flexDirection: "column",
    width:'80%',
    margin:'auto',
  },
  inputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:50,
  },
  twoInputs: {
    flexDirection:'row',
    gap:10,
  },
});
export default Program;
