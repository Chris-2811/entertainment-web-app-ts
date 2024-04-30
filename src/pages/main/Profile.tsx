import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { auth } from '@/lib/firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import useAuth from '@/hooks/useAuth';
import { db, storage } from '@/lib/firebase/firebase';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

interface ProfileData {
  email: string;
  username: string;
  location: string;
}

function Profile() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData | undefined>();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    location: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [dataUpdated, setDataUpdated] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const docSnap = await getDoc(doc(db, 'users', user?.uid));

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setProfileData(userData as ProfileData);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [user, dataUpdated]);

  async function handleLogout() {
    await signOut(auth);
    navigate('/');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (user) {
      const updatedData = {
        location: '',
        email: '',
        username: '',
      };

      if (formData.location !== '') {
        updatedData.location = formData.location.trim();
      }
      if (formData.email !== '') {
        updatedData.email = formData.email.trim();
      }
      if (formData.username !== '') {
        updatedData.username = formData.username.trim();
      }

      const docRef = doc(db, 'users', user?.uid);

      await updateDoc(docRef, updatedData);

      // Fetch the updated data from Firestore
      const updatedDocSnap = await getDoc(docRef);

      if (updatedDocSnap.exists()) {
        // Update profileData with the fetched data
        setProfileData(updatedDocSnap.data() as ProfileData);
      }

      setProfileData(formData);

      if (selectedFile) {
        try {
          const storageRef = ref(storage, selectedFile.name);
          const snapshot = await uploadBytes(storageRef, selectedFile);
          const downloadURL = await getDownloadURL(snapshot.ref);

          // Save url to firestore

          const docRef = doc(db, 'users', user.uid);
          await setDoc(docRef, { photoURL: downloadURL }, { merge: true });

          setProfileData((prevState) =>
            prevState
              ? { ...prevState, photoURL: downloadURL }
              : { photoURL: downloadURL, email: '', username: '', location: '' }
          );
          setDataUpdated(true);
        } catch (error) {
          console.log(error);
        }
      }
    }

    setEditMode(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  }

  return (
    !isLoading && (
      <div className="container">
        <div className="bg-semi-dark-blue max-w-lg py-6 px-4 md:px-6 md:py-8 mt-8 lg:mt-0 rounded-[15px]">
          <h1 className="font-medium text-xl mb-4">My Profile</h1>
          <div>
            <p>Email: {profileData && profileData.email}</p>
            <p>Username: {profileData && profileData.username}</p>
            <p>Location: {profileData && profileData.location}</p>
          </div>
          <div onClick={() => setEditMode(!editMode)} className="mt-8">
            <Button size="sm">Edit Profile</Button>
          </div>
          {editMode && (
            <form onSubmit={handleSubmit}>
              <div className="mt-6 space-y-4">
                <input
                  className="rounded-sm block w-full max-w-sm bg-greyish-blue px-4 py-2 outline-none"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={formData.email}
                />
                <input
                  className="rounded-sm block w-full max-w-sm bg-greyish-blue px-4 py-2 outline-none"
                  type="text"
                  id="username"
                  placeholder="Username"
                  onChange={handleChange}
                  value={formData.username}
                />
                <input
                  className="rounded-sm block w-full max-w-sm bg-greyish-blue px-4 py-2 outline-none"
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  id="location"
                />
                <input
                  className="rounded-sm block w-full max-w-sm bg-greyish-blue py-2 px-3"
                  type="file"
                  name="avatar"
                  id="profilePicture"
                  onChange={handleFileChange}
                />
              </div>
              <div className="max-w-sm mt-8">
                <Button>Save Changes</Button>
              </div>
            </form>
          )}

          <div className="mt-4">
            <Button onClick={handleLogout} size="sm">
              Log Out
            </Button>
          </div>
        </div>
      </div>
    )
  );
}

export default Profile;
