/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

// Hardcoded user ID for demo - replace with auth in production
export const DEMO_USER_ID = "6921395c7b3fa4d1e8ad6ede";

export function useUser(userId: string = DEMO_USER_ID) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setUser(data);
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updates: any) => {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        return data;
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return { user, loading, error, updateUser, refetch: fetchUser };
}

// Stats hooks
export function useStats(userId: string = DEMO_USER_ID, groupId?: string) {
  const [stats, setStats] = useState<any>({ individual: 0, group: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [userId, groupId]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ userId });
      if (groupId) params.append("groupId", groupId);

      const response = await fetch(`/api/stats?${params}`);
      const data = await response.json();
      if (response.ok) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, refetch: fetchStats };
}

// Transactions hooks
export function useTransactions(userId: string = DEMO_USER_ID) {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [userId]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/transactions?userId=${userId}&limit=10`
      );
      const data = await response.json();
      if (response.ok) {
        setTransactions(data.transactions);
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (transactionData: any) => {
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...transactionData }),
      });
      const data = await response.json();
      if (response.ok) {
        await fetchTransactions(); // Refresh list
        return data;
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      console.error("Error creating transaction:", err);
      throw err;
    }
  };

  return {
    transactions,
    loading,
    createTransaction,
    refetch: fetchTransactions,
  };
}

// Activities/Feed hooks
export function useActivities(
  type: "public" | "friends" | "user" = "public",
  userId: string = DEMO_USER_ID
) {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, [type, userId]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/activities?type=${type}&userId=${userId}&limit=20`
      );
      const data = await response.json();
      if (response.ok) {
        setActivities(data.activities);
      }
    } catch (err) {
      console.error("Error fetching activities:", err);
    } finally {
      setLoading(false);
    }
  };

  return { activities, loading, refetch: fetchActivities };
}

// Groups hooks
export function useGroups(type: "user" | "all" = "all", userId?: string) {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
  }, [type, userId]);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ type });
      if (userId) params.append("userId", userId);

      const response = await fetch(`/api/groups?${params}`);
      const data = await response.json();
      if (response.ok) {
        setGroups(data.groups);
      }
    } catch (err) {
      console.error("Error fetching groups:", err);
    } finally {
      setLoading(false);
    }
  };

  const joinGroup = async (groupId: string, userId: string) => {
    try {
      const response = await fetch("/api/groups", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupId, userId }),
      });
      const data = await response.json();
      if (response.ok) {
        await fetchGroups();
        return data.group;
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      console.error("Error joining group:", err);
      throw err;
    }
  };

  return { groups, loading, joinGroup, refetch: fetchGroups };
}

// Leaderboard hooks
export function useLeaderboard(
  type: "users" | "groups" = "users",
  period: "weekly" | "monthly" | "all-time" = "all-time"
) {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [type, period]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/leaderboard?type=${type}&period=${period}&limit=10`
      );
      const data = await response.json();
      if (response.ok) {
        setLeaderboard(data.leaderboard);
      }
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
    } finally {
      setLoading(false);
    }
  };

  return { leaderboard, loading, refetch: fetchLeaderboard };
}

// Donations hooks
export function useDonations(userId: string = DEMO_USER_ID) {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const createDonation = async (donationData: any) => {
    try {
      setLoading(true);
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromUserId: userId, ...donationData }),
      });
      const data = await response.json();
      if (response.ok) {
        return data.donation;
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      console.error("Error creating donation:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { donations, loading, createDonation };
}

// Friends hooks
export function useFriends(userId: string = DEMO_USER_ID) {
  const [friends, setFriends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFriends();
  }, [userId]);

  const fetchFriends = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setFriends(data.friends || []);
      }
    } catch (err) {
      console.error("Error fetching friends:", err);
    } finally {
      setLoading(false);
    }
  };

  const addFriend = async (friendId: string) => {
    try {
      const response = await fetch("/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, friendId }),
      });
      const data = await response.json();
      if (response.ok) {
        await fetchFriends();
        return data;
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      console.error("Error adding friend:", err);
      throw err;
    }
  };

  return { friends, loading, addFriend, refetch: fetchFriends };
}

// Users hooks (for discovery)
export function useUsers(excludeUserId?: string) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [excludeUserId]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (excludeUserId) params.append("excludeUserId", excludeUserId);

      const response = await fetch(`/api/users?${params}`);
      const data = await response.json();
      if (response.ok) {
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, refetch: fetchUsers };
}
