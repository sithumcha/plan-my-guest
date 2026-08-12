'use client';

import { useState, useEffect } from 'react';
import { User, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function SettingsPage() {
  const { user, wedding, loading: authLoading, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'wedding' | 'notifications'>('profile');

  // Profile Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  // Wedding Details Form State
  const [groomName, setGroomName] = useState('');
  const [brideName, setBrideName] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');

  // Status & Feedback
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Populate state from user & wedding
  useEffect(() => {
    if (user) {
      const parts = (user.name || '').split(' ');
      setFirstName(parts[0] || '');
      setLastName(parts.slice(1).join(' ') || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      if (user.profilePhoto) setProfilePhoto(user.profilePhoto);
    }
    if (wedding) {
      setGroomName(wedding.groomName || '');
      setBrideName(wedding.brideName || '');
      setVenue(wedding.venue || '');
      setDescription(wedding.story || '');
      if (wedding.weddingDate) {
        const d = new Date(wedding.weddingDate);
        if (!isNaN(d.getTime())) {
          setWeddingDate(d.toISOString().split('T')[0]);
        }
      }
    }
  }, [user, wedding]);

  // Notification Preferences State
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePhoto(url);
    }
  };

  const showFeedback = (success: string, error?: string) => {
    if (error) {
      setErrorMsg(error);
      setSuccessMsg('');
    } else {
      setSuccessMsg(success);
      setErrorMsg('');
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');
    const fullName = `${firstName} ${lastName}`.trim() || user?.name || 'User';
    const res = await updateProfile({
      name: fullName,
      email,
      phone,
      profilePhoto: profilePhoto || '',
    });
    setSaving(false);
    if (res.success) {
      showFeedback('Profile saved successfully!');
    } else {
      showFeedback('', res.error || 'Failed to update profile');
    }
  };

  const handleSaveWedding = async () => {
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');
    const res = await updateProfile({
      groomName: groomName || 'Groom',
      brideName: brideName || 'Bride',
      weddingDate,
      venue,
      story: description,
    });
    setSaving(false);
    if (res.success) {
      showFeedback('Wedding details updated successfully!');
    } else {
      showFeedback('', res.error || 'Failed to update wedding details');
    }
  };

  const handleDiscard = () => {
    if (user) {
      const parts = (user.name || '').split(' ');
      setFirstName(parts[0] || '');
      setLastName(parts.slice(1).join(' ') || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
    if (wedding) {
      setGroomName(wedding.groomName || '');
      setBrideName(wedding.brideName || '');
      setVenue(wedding.venue || '');
      setDescription(wedding.story || '');
      if (wedding.weddingDate) {
        const d = new Date(wedding.weddingDate);
        if (!isNaN(d.getTime())) {
          setWeddingDate(d.toISOString().split('T')[0]);
        }
      }
    }
    setSuccessMsg('');
    setErrorMsg('');
  };

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}` || 'U';

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans bg-[#FFF8F0] min-h-screen">
      {/* Header */}
      <header className="mb-6">
        <h1 className="font-serif text-4xl font-bold text-[#353023]">Settings</h1>
        <p className="text-sm text-[#504444] mt-2 font-normal">
          Manage your account preferences, wedding details, and notification settings in one place.
        </p>
      </header>

      {/* Success / Error Messages */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2 font-semibold animate-[fadeIn_0.2s_ease-out]">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2 font-semibold animate-[fadeIn_0.2s_ease-out]">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-8 border-b border-[#EBE2CE] relative mb-8">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 font-medium text-sm transition-all ${
            activeTab === 'profile'
              ? 'text-[#785655] font-bold border-b-2 border-[#785655] relative top-[1px]'
              : 'text-[#504444] hover:text-[#785655]'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('wedding')}
          className={`pb-3 font-medium text-sm transition-all ${
            activeTab === 'wedding'
              ? 'text-[#785655] font-bold border-b-2 border-[#785655] relative top-[1px]'
              : 'text-[#504444] hover:text-[#785655]'
          }`}
        >
          Wedding Details
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`pb-3 font-medium text-sm transition-all ${
            activeTab === 'notifications'
              ? 'text-[#785655] font-bold border-b-2 border-[#785655] relative top-[1px]'
              : 'text-[#504444] hover:text-[#785655]'
          }`}
        >
          Notifications
        </button>
      </div>

      {/* Tab Content: Profile */}
      {activeTab === 'profile' && (
        <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
          <section className="bg-white rounded-2xl border border-[#EBE2CE] p-8 shadow-[0_10px_30px_-10px_rgba(247,202,201,0.4)]">
            <h3 className="font-serif text-2xl font-semibold text-[#353023] mb-6">Personal Information</h3>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar Column */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-32 h-32 rounded-full border-4 border-[#F7EDD9] bg-[#F5E6E3] overflow-hidden shadow-sm flex items-center justify-center text-[#785655] font-serif text-3xl font-bold">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>
                <label className="text-xs font-medium text-[#785655] hover:text-[#5E3F3E] cursor-pointer transition-colors flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5" /> Upload Photo
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>

              {/* Form Column */}
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-2">
                  <label className="block text-[#1F1B0F] font-medium text-xs">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-lg px-4 py-3 text-sm text-[#1F1B0F] focus:outline-none focus:ring-2 focus:ring-[#785655] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[#1F1B0F] font-medium text-xs">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-lg px-4 py-3 text-sm text-[#1F1B0F] focus:outline-none focus:ring-2 focus:ring-[#785655] transition-all"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-[#1F1B0F] font-medium text-xs">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-lg px-4 py-3 text-sm text-[#1F1B0F] focus:outline-none focus:ring-2 focus:ring-[#785655] transition-all"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-[#1F1B0F] font-medium text-xs">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+94 77 123 4567"
                    className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-lg px-4 py-3 text-sm text-[#1F1B0F] focus:outline-none focus:ring-2 focus:ring-[#785655] transition-all"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleDiscard}
              className="bg-[#F7EDD9] border border-[#D4C3C2] text-[#1F1B0F] font-medium text-xs rounded-lg px-6 py-3 hover:bg-[#F1E7D4] transition-colors"
            >
              Discard Changes
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={handleSaveProfile}
              className="bg-[#785655] hover:bg-[#5E3F3E] text-white font-medium text-xs rounded-lg px-6 py-3 shadow-sm transition-colors flex items-center gap-2"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      )}

      {/* Tab Content: Wedding Details */}
      {activeTab === 'wedding' && (
        <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
          <section className="bg-white rounded-2xl border border-[#EBE2CE] p-8 shadow-sm space-y-6">
            <h3 className="font-serif text-2xl font-semibold text-[#353023]">Event Specifics</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <label className="block text-[#1F1B0F] font-medium text-xs">Groom Name</label>
                <input
                  type="text"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  placeholder="e.g. Kasun"
                  className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-lg px-4 py-3 text-sm text-[#1F1B0F] focus:outline-none focus:ring-2 focus:ring-[#785655] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[#1F1B0F] font-medium text-xs">Bride Name</label>
                <input
                  type="text"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  placeholder="e.g. Dilhani"
                  className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-lg px-4 py-3 text-sm text-[#1F1B0F] focus:outline-none focus:ring-2 focus:ring-[#785655] transition-all"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-[#1F1B0F] font-medium text-xs">Wedding Date</label>
                <input
                  type="date"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-lg px-4 py-3 text-sm text-[#1F1B0F] focus:outline-none focus:ring-2 focus:ring-[#785655] transition-all"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-[#1F1B0F] font-medium text-xs">Venue Location</label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. Shangri-La Colombo"
                  className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-lg px-4 py-3 text-sm text-[#1F1B0F] focus:outline-none focus:ring-2 focus:ring-[#785655] transition-all"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-[#1F1B0F] font-medium text-xs">Event Description / Story</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-lg px-4 py-3 text-sm text-[#1F1B0F] focus:outline-none focus:ring-2 focus:ring-[#785655] transition-all resize-none"
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleDiscard}
              className="bg-[#F7EDD9] border border-[#D4C3C2] text-[#1F1B0F] font-medium text-xs rounded-lg px-6 py-3 hover:bg-[#F1E7D4] transition-colors"
            >
              Discard Changes
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={handleSaveWedding}
              className="bg-[#785655] hover:bg-[#5E3F3E] text-white font-medium text-xs rounded-lg px-6 py-3 shadow-sm transition-colors flex items-center gap-2"
            >
              {saving ? 'Updating...' : 'Update Wedding Details'}
            </button>
          </div>
        </div>
      )}

      {/* Tab Content: Notifications */}
      {activeTab === 'notifications' && (
        <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
          <section className="bg-white rounded-2xl border border-[#EBE2CE] p-8 shadow-sm space-y-6">
            <h3 className="font-serif text-2xl font-semibold text-[#353023]">Communication Preferences</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between py-4 border-b border-[#EBE2CE]">
                <div>
                  <h4 className="font-medium text-[#1F1B0F] text-sm">Email Notifications</h4>
                  <p className="text-[#504444] text-xs mt-1">Receive daily summaries of new RSVPs and messages.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailNotifs(!emailNotifs)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                    emailNotifs ? 'bg-[#785655]' : 'bg-[#EBE2CE]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform ${
                      emailNotifs ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-[#EBE2CE]">
                <div>
                  <h4 className="font-medium text-[#1F1B0F] text-sm">SMS Alerts</h4>
                  <p className="text-[#504444] text-xs mt-1">Get instant text messages for urgent vendor updates.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSmsAlerts(!smsAlerts)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                    smsAlerts ? 'bg-[#785655]' : 'bg-[#EBE2CE]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform ${
                      smsAlerts ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
