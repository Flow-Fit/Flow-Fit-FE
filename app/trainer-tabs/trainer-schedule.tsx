import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, Button, ScrollView } from "react-native";
import { Calendar,  LocaleConfig } from "react-native-calendars";
import { useTrainerApi } from "../../hooks/useTrainerApi";
import { useAuth } from "../../hooks/useAuth";
import ScheduleList from "../../components/ScheduleList";
import AddScheduleModal from "../../components/AddScheduleModal";

export default function ScheduleScreen() {
  const { token, role, logout } = useAuth();
  const { members,schedule, details, fetchScheduleData,fetchMembers , addSchedule } = useTrainerApi(token, logout);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [trainingTarget, setTrainingTarget] = useState("");
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  useEffect(() => {
    if (token) {
      fetchMembers();
      fetchScheduleData();
    }
  }, [token]);

  LocaleConfig.locales["ko"] = {
    monthNames: [
      '1월', '2월', '3월', '4월', '5월', '6월',
      '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    today: "오늘",
  };

  LocaleConfig.defaultLocale = "ko";

   // 현재 날짜 구하기
  const today = new Date().toISOString().split("T")[0];

  const handleDayPress = (day: { dateString: string }) => setSelectedDate(day.dateString);

  const handleAddSchedule = () => {
    if (!selectedDate || !location || !time || !trainingTarget || selectedMember === null) {
      return;
    }
    console.log(selectedDate, time)
    const newSchedule = {
      memberId: selectedMember,
      date: `${selectedDate}T${time}:00`,
      location,
      trainingTarget,
    };
    addSchedule(newSchedule);
    setModalVisible(false);
    setLocation("");
    setTime("");
    setTrainingTarget("");
    setSelectedMember(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.totalCtn}>
        <Text style={styles.monthText}>2월 총 수익</Text>
        {/* 매출 필터 추가 */}
        <Text style={styles.moneyText}>5,400,000원</Text>
      </View>
      {token ? (
        <>
          <Calendar 
            style={styles.calendar}
            theme={{
              backgroundColor: '#FFFFFF',
              calendarBackground: '#FFFFFF',
            //   textSectionTitleColor: '#b6c1cd',
            //   selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#000',
              todayTextColor: '#FFFFFF',
              dayTextColor: '#939393',
            //   textDisabledColor: '#dd99ee'
            }}
            markedDates={{
              [today]: {
                customStyles: {
                  container: {
                    backgroundColor: "black", // 검은색 원
                    borderRadius: 50, // 원형 모양
                    width: 35, // 원 크기 조절
                    height: 35,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  text: {
                    marginTop: 2,
                    marginRight: 1,
                  },
                },
              },
              ...schedule, // 기존 스케줄 유지
            }}
            markingType="custom"
            renderHeader={(date) => {
              let parsedDate;
              if (typeof date === "string") {
                parsedDate = new Date(date); // 문자열이면 Date 객체로 변환
              } else {
                parsedDate = date; // 이미 Date 객체면 그대로 사용
              }
            
              const year = parsedDate.getFullYear();
              const month = parsedDate.getMonth() + 1; // 월은 0부터 시작하므로 +1
              return `${year}년 ${month}월`;
            }}
          // markedDates={schedule} 
          onDayPress={handleDayPress} />
          <ScrollView>
            <ScheduleList schedules={details.filter((s) => s.date.startsWith(selectedDate))}  members={ members } trainers={ undefined } role = {role}/>
          </ScrollView>
          <Button title="새 스케줄 추가" onPress={() => setModalVisible(true)} />
          <AddScheduleModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onAdd={handleAddSchedule}
            location={location}
            setLocation={setLocation}
            time={time}
            setTime={setTime}
            trainingTarget={trainingTarget}
            setTrainingTarget={setTrainingTarget}
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
            members={members}
            selectedDate={selectedDate}
          />
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
    backgroundColor: "#F9F9F9",
  },
  totalCtn: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    padding: 22,
    borderRadius: 15,
    gap: 20,

  },
  monthText: {
    fontFamily: "Pretenadrd",
    fontSize: 16,
    fontWeight: "600",

  },
  moneyText: {
    fontFamily: "Pretendard",
    fontSize: 24,
    fontWeight: "500",
    alignSelf: "flex-end"
  },
  calendar: {
    marginTop: 15,
    width: "100%",

  }
});