import { createContext, useContext, useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currenUser, setCurrentUser] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setIsLoading] = useState(true);
    const [role, setRole] = useState(""); // admin/user/sub-admin

    const initializeUser = async (authUser) => {
        if (authUser) {
            setCurrentUser({ ...authUser });
            setIsLogin(true);

            try {
                const docref = doc(db, "users", authUser.uid);
                const docSnap = await getDoc(docref);

               
                if (docSnap.exists()) {
                    const userRole = docSnap.data().role;
                    setRole(userRole);
                } else {
                    
                    setRole("user"); 
                }
            } catch (error) {
                console.error("Error fetching role:", error);
                setRole("");
            }
        } else {
            setCurrentUser(null);
            setIsLogin(false);
            setRole("");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const unsubscribefunc = onAuthStateChanged(auth, initializeUser);
        return unsubscribefunc;
    }, []);

    const value = {
        isLogin,
        loading,
        currenUser,
        role
    };

    return (
        <AuthContext.Provider value={value}>
            {/* লোডিং অবস্থায় children না দেখানোই ভালো */}
            {children}
        </AuthContext.Provider>
    );
};