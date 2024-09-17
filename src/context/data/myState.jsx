import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDb } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

function MyState(props) {
  const [mode, setMode] = useState("light"); // Whether dark mode is enabled or not
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [searchkey, setSearchkey] = useState("");
  const [loading, setLoading] = useState(false);

  const [getAllBlog, setGetAllBlog] = useState([]);

  function getAllBlogs() {
    setLoading(true);
    try {
      const q = query(collection(fireDb, "blogPost"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let blogArray = [];
        QuerySnapshot.forEach((doc) => {
          blogArray.push({ ...doc.data(), id: doc.id });
        });

        setGetAllBlog(blogArray);
        setLoading(false);
      }, (error) => {
        console.log(error);
        setLoading(false);
      });

      // Clean up subscription on component unmount
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = getAllBlogs();

    // Clean up subscription on component unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Blog Delete Function
  const deleteBlogs = async (id) => {
    try {
      await deleteDoc(doc(fireDb, "blogPost", id));
      // Re-fetch blogs after deletion
      getAllBlogs();
      toast.success("Blogs deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        searchkey,
        setSearchkey,
        loading,
        setLoading,
        getAllBlog,
        deleteBlogs,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
