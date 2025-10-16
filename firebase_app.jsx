import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

// 🔹 Your Firebase config (from Project Settings → SDK setup)
const firebaseConfig = {
  apiKey: "AIzaSyCc6Of730EHhhRpuX9PHw8BCrrpV4zsk1w",
  authDomain: "cloud-7a48d.firebaseapp.com",
  projectId: "cloud-7a48d",
  storageBucket: "cloud-7a48d.firebasestorage.app",
  messagingSenderId: "1067556153839",
  appId: "1:1067556153839:web:99351e1145c10bfa20ae1a"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function FirestoreMinimal() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      if (u) {
        setStatus(`Signed in as ${u.email}`);
        loadItems();
      } else {
        setStatus('Not signed in');
        setItems([]);
      }
    });
    return () => unsub();
  }, []);

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setStatus('Registered successfully');
    } catch (e) {
      setStatus(e.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setStatus('Logged in');
    } catch (e) {
      setStatus(e.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setStatus('Signed out');
  };

  const createItem = async () => {
    if (!text) return;
    await addDoc(collection(db, 'items'), { text, createdAt: new Date().toISOString() });
    setText('');
    loadItems();
  };

  const loadItems = async () => {
    const snapshot = await getDocs(collection(db, 'items'));
    const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    setItems(list);
  };

  const updateItem = async (id, oldText) => {
    const newText = prompt('Edit text', oldText);
    if (!newText) return;
    await updateDoc(doc(db, 'items', id), { text: newText });
    loadItems();
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
    loadItems();
  };

  return (
    <div style={{ fontFamily: 'system-ui', maxWidth: 600, margin: '20px auto' }}>
      <h2>Firebase Firestore Minimal (React)</h2>

      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      <div>{status}</div>

      <hr />

      {user && (
        <>
          <input placeholder="New item text" value={text} onChange={e => setText(e.target.value)} />
          <button onClick={createItem}>Add</button>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.text} <small>{item.createdAt}</small>
                <button onClick={() => updateItem(item.id, item.text)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}


/*
1)create new firebase prject->remove 2 gemini
2)build->authentication and click get started
3)click email, password and eneable email password only and refresh
4)build->firestore database->click create a database
5)click next->next->In configure click test mode then create
6)npm create vite@latest myapp->yes,react,js,no,yes
7)copy this code and paste in the <myapp->
8)cd myapp and npm install firebase
go to firebase settings and do all steps and copy that code and replace here and run all the commands specified there
9)npm run build
10)firebase login->no,no->now login successfully
11)firebase init hosting->yes,use an existing project,project name,change public to dist,yes,no,no
12)firebase deploy->final step
/*