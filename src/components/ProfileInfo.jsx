import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileInfo = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    aboutUs: '',
    experience: '',
    profileType: 'Individual',
    firmName: '',
    languageSpoken: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/profile');
        const data = res.data;

        const [firstName, ...restName] = data.name?.split(' ') || [];
        const lastName = restName.join(' ');

        setProfile(data);
        setFormData({
          firstName,
          lastName,
          aboutUs: data.aboutUs || '',
          experience: data.experience || '',
          profileType: data.profileType || 'Individual',
          firmName: data.firmName || '',
          languageSpoken: (data.languageSpoken || []).join(', '),
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/profile', {
        name: `${formData.firstName} ${formData.lastName}`,
        aboutUs: formData.aboutUs,
        experience: formData.experience,
        profileType: formData.profileType,
        firmName: formData.profileType === 'Firm' ? formData.firmName : '',
        languageSpoken: formData.languageSpoken.split(',').map(lang => lang.trim()),
      });
      alert('Profile updated successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <form className="max-w-2xl p-6 space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold">Profile Information</h2>

      {/* Verified Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Profile Status</label>
        <p className={profile.isVerified ? 'text-green-600' : 'text-red-600'}>
          {profile.isVerified ? 'Verified' : 'Not Verified'}
        </p>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={profile.email}
          disabled
          className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* First & Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Professional Category</label>
        <input
          type="text"
          value={profile.category}
          disabled
          className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* About Us */}
      <div>
        <label className="block text-sm font-medium text-gray-700">About Us</label>
        <textarea
          name="aboutUs"
          value={formData.aboutUs}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded-md"
          rows="3"
        />
      </div>

      {/* Experience */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
        <input
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          type="number"
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>

      {/* Profile Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Profile Type</label>
        <select
          name="profileType"
          value={formData.profileType}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded-md"
        >
          <option value="Individual">Individual</option>
          <option value="Firm">Firm</option>
        </select>
      </div>

      {/* Firm Name (if Firm) */}
      {formData.profileType === 'Firm' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Firm Name</label>
          <input
            name="firmName"
            value={formData.firmName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>
      )}

      {/* Languages */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Languages Spoken (comma-separated)</label>
        <input
          name="languageSpoken"
          value={formData.languageSpoken}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>

      {/* Submit */}
      <div className="text-right">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileInfo;
