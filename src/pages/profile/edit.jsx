import { useEffect, useState } from "react";
import { getProfileByEmail, createOrUpdateProfile } from "../../services/profileService";
import ProfileForm from "../../components/ProfileForm";

export default function EditProfilePage() {
  const [profile, setProfile] = useState(null);
  const userEmail = "example@email.com"; // Ideally from auth

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileByEmail(userEmail);
        setProfile(data);
      } catch (error) {
        console.error(error);
        alert("Error loading profile");
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (data) => {
    try {
      await createOrUpdateProfile(data);
      alert("Profile Updated Successfully!");
    } catch (error) {
      console.error(error);
      alert("Error Updating Profile");
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Edit Your Profile</h1>
      {profile ? <ProfileForm initialData={profile} onSubmit={handleSubmit} /> : <p>Loading...</p>}
    </div>
  );
}
