import { api } from "../lib/api";
import { authClient } from "../lib/auth";
import type { TrainingPlan, User, UserProfile } from "../types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface AuthContextType {
  user: User | null;
  plan: TrainingPlan | null;
  isLoading: boolean;
  isGenerating: boolean; // ✅ NEW
  saveProfile: (
    profile: Omit<UserProfile, "userId" | "updatedAt">
  ) => Promise<void>;
  generatePlan: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [neonUser, setNeonUser] = useState<any>(null);
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false); // ✅ NEW

  const isRefreshingRef = useRef(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const result = await authClient.getSession();
        if (result && result.data?.user) {
          setNeonUser(result.data.user);
        } else {
          setNeonUser(null);
        }
      } catch (err) {
        console.error("Failed to load user:", err);
        setNeonUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (neonUser?.id) {
        refreshData();
      } else {
        setPlan(null);
      }
    }
  }, [neonUser?.id, isLoading]);

  // refresh data
  const refreshData = useCallback(async () => {
    if (!neonUser || isRefreshingRef.current) return;
    isRefreshingRef.current = true;

    try {
      const planData = await api
        .getCurrentPlan(neonUser.id)
        .catch(() => null);

      if (planData) {
        setPlan({
          id: planData.id,
          userId: planData.userId,
          overview: planData.planJson.overview,
          weeklySchedule: planData.planJson.weeklySchedule,
          progression: planData.planJson.progression,
          version: planData.version,
          createdAt: planData.createdAt,
        });
      } else {
        setPlan(null);
      }
    } catch (err) {
      console.error("Error refreshing data:", err);
    } finally {
      isRefreshingRef.current = false;
    }
  }, [neonUser?.id]);

  async function saveProfile(
    profileData: Omit<UserProfile, "userId" | "updatedAt">
  ) {
    if (!neonUser) {
      throw new Error("Must be logged in to save profile");
    }
    await api.saveProfile(neonUser.id, profileData);
    await refreshData();
  }

  async function generatePlan() {
    if (!neonUser) {
      throw new Error("Must be logged in to generate plan");
    }

    if (isGenerating) return; // ✅ chống spam

    try {
      setIsGenerating(true);

      await api.generatePlan(neonUser.id);

      await refreshData();
    } catch (err) {
      console.error("Generate plan failed:", err);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: neonUser,
        plan,
        isLoading,
        isGenerating, // ✅ expose
        saveProfile,
        generatePlan,
        refreshData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}