import { useState, useEffect } from "react";
import { API } from "../api/api";

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/me/"); // your current user endpoint
        setUser(res.data);
      } catch (err) {
        setUser(null); // not logged in
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { user, loading };
};
