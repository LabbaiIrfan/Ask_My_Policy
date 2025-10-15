import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './info';

interface AuthContextType {
  user: any;
  session: any;
  signUpWithEmail: (params: { email: string; password: string; fullName: string }) => Promise<any>;
  signInWithEmail: (email: string, password: string) => Promise<any>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signUpWithEmail = async ({ email, password, fullName }: { email: string; password: string; fullName: string; }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}`, // redirect back to your app
        data: { full_name: fullName }
      }
   });
    if (error) throw error;
    return data;
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    // <-- changed message to the more informative text you requested
    if (data.user && !data.user.email_confirmed_at) {
        throw new Error("Your Email is not confirmed yet. Please check your mail and click the link to verify. Try again after verification.");
    }

    return data;
  }


  const signOutUser = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, signUpWithEmail, signInWithEmail, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
export { supabase };

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('profile_data, profile_completed')
    .eq('id', userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
  return data;
}

