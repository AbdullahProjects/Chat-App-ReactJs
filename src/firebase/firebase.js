import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqcXkDSsaWawsOiByvej8czsSqADp2svI",
  authDomain: "chat-app-reactjs-ed073.firebaseapp.com",
  projectId: "chat-app-reactjs-ed073",
  storageBucket: "chat-app-reactjs-ed073.firebasestorage.app",
  messagingSenderId: "1052506077643",
  appId: "1:1052506077643:web:d093947b7948144010de4e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const sendMessage = async (messageText, chatId, user1, user2) => {
  const chatRef = doc(db, "chats", chatId);

  const chatDoc = await getDoc(chatRef);
  if (!chatDoc.exists()) {
    // For new chat collection, get user docs also
    const user1Doc = await getDoc(doc(db, "user", user1));
    const user2Doc = await getDoc(doc(db, "user", user2));

    await setDoc(chatRef, {
      users: [user1Doc.data(), user2Doc.data()],
      lastMessage: messageText,
      lastMessageTimestamp: serverTimestamp(),
    });
  } else {
    await updateDoc(chatRef, {
      lastMessage: messageText,
      lastMessageTimestamp: serverTimestamp(),
    });
  }

  // Add message in messages collection
  const messageRef = collection(db, "chats", chatId, "messages");

  await addDoc(messageRef, {
    text: messageText,
    sender: auth.currentUser.email,
    timestamp: serverTimestamp(),
  });
};

export const listenForChats = (setChats) => {
  const chatsRef = collection(db, "chats");
  const unsubscribe = onSnapshot(chatsRef, (snapshot) => {
    const chatList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filteredChats = chatList.filter((chat) =>
      chat?.users?.some((user) => user.uid === auth.currentUser.uid)
    );
    setChats(filteredChats);
  });
  return unsubscribe;
};

export const listendForMessages = (chatId, setChatMessages) => {
  const chatRef = collection(db, "chats", chatId, "messages");
  onSnapshot(chatRef, (snapshot) => {
    const messages = snapshot.docs.map((doc) => doc.data());
    setChatMessages(messages);
  });
};


// Helper function to format time as "1:30 PM"
export const formatTime = (timestamp) => {
  if (!timestamp || !timestamp.seconds) return '...';
  const date = new Date(timestamp.seconds * 1000);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
};

// Helper function to format date as "12 Feb, 2025"
export const formatDate = (timestamp) => {
  if (!timestamp || !timestamp.seconds) return '...';
  const date = new Date(timestamp.seconds * 1000);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

export { auth, db };
