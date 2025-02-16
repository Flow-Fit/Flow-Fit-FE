import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Button, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { useMemberApi } from "../../hooks/useMemberApi";
import { useAuth } from "../../hooks/useAuth";
import ScheduleList from "../../components/ScheduleList";

export default function ScheduleScreen() {
  const { token, role, logout } = useAuth();
  const { trainers, schedule, details, fetchScheduleData} = useMemberApi(token, logout);
  const [ selectedDate, setSelectedDate ] = useState("");

  useEffect(() => {
    if (token) {
      fetchScheduleData();
    }
  }, [token]);

  const handleDayPress = (day: { dateString: string }) => setSelectedDate(day.dateString);

  return (
    <View style={styles.container}>
      {token ? (
        <>
          <Calendar markedDates={schedule} onDayPress={handleDayPress} />
          <ScrollView>
            <ScheduleList schedules={details.filter((s) => s.date.startsWith(selectedDate))} members={ undefined } trainers={trainers} role = {role}/>
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});