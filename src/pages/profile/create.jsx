import ProfileForm from "../../components/ProfileForm";
import { createOrUpdateProfile } from "../../services/profileService";
import { useNavigate } from "react-router-dom";

export default function CreateProfilePage() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createOrUpdateProfile(data);
      alert("Profile Created Successfully!");
      navigate('/profile/edit'); // move to edit page after creation
    } catch (error) {
      console.error(error);
      alert("Error Creating Profile");
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Create Your Profile</h1>
      <ProfileForm onSubmit={handleSubmit} />
    </div>
  );
}
