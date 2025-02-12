import { useState } from "react";
import { Alert } from "react-native";
import { fetchWithAuth } from "../utils/apiClient";

export interface ScheduleData {
  id: number;
  date: string; // ISO 8601 형식
  location: string;
  trainingTarget: string;
  status: string;
  memberId: number;
  trainerId: number;
}

export interface Member {
  id: number;
  user: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}

export const useTrainerApi = (token: string | null, logout: () => Promise<void>) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [schedule, setSchedule] = useState<Record<string, { marked: boolean; dotColor: string }>>({});
  const [details, setDetails] = useState<ScheduleData[]>([]);

  const fetchMembers = async () => {
    try {
      const response = await fetchWithAuth(
        "/trainer/members",
        {},
        token,
        logout
      );
      
      setMembers(response.members || []);
    } catch (error) {
      console.error("Failed to fetch members:", error);
      Alert.alert("오류", "멤버 데이터를 가져오는데 실패했습니다.");
    }
  };

  const fetchScheduleData = async () => {
    try {
      const response: ScheduleData[] = await fetchWithAuth(
        "/trainer/schedules?month=2025-01",
        {},
        token,
        logout
      );

      const markedDates: Record<string, { marked: boolean; dotColor: string }> = {};
      response.forEach((item) => {
        if (item.date) {
          const date = item.date.split("T")[0];
          markedDates[date] = { marked: true, dotColor: "blue" };
        }
      });

      setSchedule(markedDates);
      setDetails(response);

    } catch (error) {
      console.error("Failed to fetch schedule data:", error);
      Alert.alert("오류", "스케줄 데이터를 가져오는데 실패했습니다.");
    }
  };

  const addSchedule = async (newSchedule: Omit<ScheduleData, "id" | "status" | "trainerId">) => {
    try {
      newSchedule.memberId = Number(newSchedule.memberId)
      
      const response: ScheduleData = await fetchWithAuth(
        "/trainer/schedules/propose",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSchedule),
        },
        token,
        logout
      );

      const formattedDate = response.date.split("T")[0];
      setSchedule((prev) => ({
        ...prev,
        [formattedDate]: { marked: true, dotColor: "green" },
      }));
      
      setDetails((prev) => [...prev, response]);

      Alert.alert("성공", "새로운 스케줄이 추가되었습니다.");
    } catch (error) {
      console.error("Failed to add schedule:", error);
      Alert.alert("오류", "스케줄 추가에 실패했습니다.");
    }
  };

  return {members, schedule, details, fetchMembers , fetchScheduleData, addSchedule };
};