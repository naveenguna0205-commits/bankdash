import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Pencil, ChevronDown } from 'lucide-react';
import charleneImg from '../../assets/icons/charlene.png';

export const SettingPage = () => {
  const { userProfile, updateProfile, addToast } = useApp();

  const [activeTab, setActiveTab] = useState('editProfile'); // editProfile | preferences | security

  // Edit Profile Form State
  const [formData, setFormData] = useState({
    name: userProfile.name || 'Charlene Reed',
    username: userProfile.username || 'Charlene Reed',
    email: userProfile.email || 'charlenereed@gmail.com',
    password: userProfile.password || '************',
    dob: userProfile.dob || '25 January 1990',
    presentAddress: userProfile.presentAddress || 'San Jose, California, USA',
    permanentAddress: userProfile.permanentAddress || 'San Jose, California, USA',
    city: userProfile.city || 'San Jose',
    postalCode: userProfile.postalCode || '45962',
    country: userProfile.country || 'USA',
    avatar: userProfile.avatar || charleneImg
  });

  // Preferences Form State
  const [currency, setCurrency] = useState(userProfile.currency || 'USD');
  const [timezone, setTimezone] = useState(userProfile.timezone || '(GMT-12:00) International Date Line West');
  const [notifications, setNotifications] = useState({
    digitalCurrency: userProfile.notifications?.digitalCurrency ?? true,
    merchantOrder: userProfile.notifications?.merchantOrder ?? false,
    recommendations: userProfile.notifications?.recommendations ?? true
  });

  // Security Form State
  const [twoFactor, setTwoFactor] = useState(userProfile.twoFactorAuth ?? true);
  const [currentPassword, setCurrentPassword] = useState('***********');
  const [newPassword, setNewPassword] = useState('***********');

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    addToast('Profile Saved', 'Profile details updated successfully.', 'success');
  };

  const handlePreferencesSubmit = (e) => {
    e.preventDefault();
    updateProfile({ currency, timezone, notifications });
    addToast('Preferences Saved', 'Your preferences have been saved.', 'success');
  };

  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    updateProfile({ twoFactorAuth: twoFactor });
    addToast('Security Settings Saved', 'Security preferences updated successfully.', 'success');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatar: url }));
      updateProfile({ avatar: url });
      addToast('Avatar Updated', 'Profile photo updated.', 'success');
    }
  };

  return (
    <div className="bg-[#131E36] rounded-[22px] sm:rounded-[25px] p-5 sm:p-8 lg:p-10 border border-[#1E293B] shadow-xs min-h-[580px] animate-fade-in-up">
      {/* Settings Navigation Tabs */}
      <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-14 border-b border-[#1E293B] pb-0 text-[14px] sm:text-[16px]">
        <button
          onClick={() => setActiveTab('editProfile')}
          className={`pb-2.5 sm:pb-3.5 relative transition-colors cursor-pointer bg-transparent border-0 outline-none ${
            activeTab === 'editProfile'
              ? 'font-bold text-[#818CF8] border-b-[2.5px] border-[#818CF8] -mb-[1.5px]'
              : 'font-semibold text-[#94A3B8] hover:text-[#818CF8]'
          }`}
        >
          Edit Profile
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`pb-2.5 sm:pb-3.5 relative transition-colors cursor-pointer bg-transparent border-0 outline-none ${
            activeTab === 'preferences'
              ? 'font-bold text-[#818CF8] border-b-[2.5px] border-[#818CF8] -mb-[1.5px]'
              : 'font-semibold text-[#94A3B8] hover:text-[#818CF8]'
          }`}
        >
          Preferences
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`pb-2.5 sm:pb-3.5 relative transition-colors cursor-pointer bg-transparent border-0 outline-none ${
            activeTab === 'security'
              ? 'font-bold text-[#818CF8] border-b-[2.5px] border-[#818CF8] -mb-[1.5px]'
              : 'font-semibold text-[#94A3B8] hover:text-[#818CF8]'
          }`}
        >
          Security
        </button>
      </div>

      {/* Tab 1: Edit Profile */}
      {activeTab === 'editProfile' && (
        <form onSubmit={handleProfileSubmit} className="pt-6 sm:pt-8 animate-fade-in-scale">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-14 items-center md:items-start">
            {/* Left: Avatar with Blue Edit Pencil Badge */}
            <div className="w-full md:w-auto flex justify-center md:justify-start shrink-0 pt-1">
              <div className="relative w-[130px] h-[130px]">
                <img
                  src={formData.avatar || charleneImg}
                  alt={formData.name}
                  className="w-full h-full rounded-full object-cover shadow-sm ring-4 ring-slate-700/60 group-hover:scale-105 transition-transform"
                />
                <label
                  className="absolute bottom-1 right-1 w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] rounded-full bg-[#4F46E5] text-white flex items-center justify-center shadow-md hover:bg-[#4338CA] active:scale-95 cursor-pointer transition-all border-2 border-[#131E36]"
                  title="Change photo"
                >
                  <Pencil className="w-3.5 h-3.5 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    autoComplete="off"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
            </div>

            {/* Right: 2-column input fields on tablet/desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-5 flex-1 w-full text-left">
              {/* Row 1: Your Name & User Name */}
              <div>
                <label className="block text-[13px] sm:text-[15px] font-medium text-[#F8FAFC] mb-1.5 sm:mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  autoComplete="name"
                  className="w-full text-[13px] sm:text-[15px] font-normal text-[#F8FAFC] py-3 sm:py-3.5 px-4 sm:px-5 rounded-[14px] sm:rounded-[15px] border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] transition-all"
                />
              </div>

              <div>
                <label className="block text-[13px] sm:text-[15px] font-medium text-[#F8FAFC] mb-1.5 sm:mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  autoComplete="username"
                  className="w-full text-[13px] sm:text-[15px] font-normal text-[#F8FAFC] py-3 sm:py-3.5 px-4 sm:px-5 rounded-[14px] sm:rounded-[15px] border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] transition-all"
                />
              </div>

              {/* Row 2: Email & Password */}
              <div>
                <label className="block text-[13px] sm:text-[15px] font-medium text-[#F8FAFC] mb-1.5 sm:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  autoComplete="email"
                  className="w-full text-[13px] sm:text-[15px] font-normal text-[#F8FAFC] py-3 sm:py-3.5 px-4 sm:px-5 rounded-[14px] sm:rounded-[15px] border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] transition-all"
                />
              </div>

              <div>
                <label className="block text-[13px] sm:text-[15px] font-medium text-[#F8FAFC] mb-1.5 sm:mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  autoComplete="current-password"
                  className="w-full text-[13px] sm:text-[15px] font-normal text-[#F8FAFC] py-3 sm:py-3.5 px-4 sm:px-5 rounded-[14px] sm:rounded-[15px] border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] font-mono transition-all"
                />
              </div>

              {/* Row 3: Date of Birth & Present Address */}
              <div>
                <label className="block text-[13px] sm:text-[15px] font-medium text-[#F8FAFC] mb-1.5 sm:mb-2">
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    autoComplete="bday"
                    className="w-full text-[13px] sm:text-[15px] font-normal text-[#F8FAFC] py-3 sm:py-3.5 px-4 sm:px-5 rounded-[14px] sm:rounded-[15px] border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] cursor-pointer transition-all"
                  />
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[13px] sm:text-[15px] font-medium text-[#F8FAFC] mb-1.5 sm:mb-2">
                  Present Address
                </label>
                <input
                  type="text"
                  value={formData.presentAddress}
                  onChange={(e) => setFormData({ ...formData, presentAddress: e.target.value })}
                  autoComplete="street-address"
                  className="w-full text-[13px] sm:text-[15px] font-normal text-[#F8FAFC] py-3 sm:py-3.5 px-4 sm:px-5 rounded-[14px] sm:rounded-[15px] border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] transition-all"
                />
              </div>

              {/* Row 4: Permanent Address & City */}
              <div>
                <label className="block text-[13px] sm:text-[15px] font-medium text-[#F8FAFC] mb-1.5 sm:mb-2">
                  Permanent Address
                </label>
                <input
                  type="text"
                  value={formData.permanentAddress}
                  onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
                  autoComplete="street-address"
                  className="w-full text-[13px] sm:text-[15px] font-normal text-[#F8FAFC] py-3 sm:py-3.5 px-4 sm:px-5 rounded-[14px] sm:rounded-[15px] border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] transition-all"
                />
              </div>

              <div>
                <label className="block text-[13px] sm:text-[15px] font-medium text-[#F8FAFC] mb-1.5 sm:mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  autoComplete="address-level2"
                  className="w-full text-[13px] sm:text-[15px] font-normal text-[#F8FAFC] py-3 sm:py-3.5 px-4 sm:px-5 rounded-[14px] sm:rounded-[15px] border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] transition-all"
                />
              </div>

              {/* Row 5: Postal Code & Country */}
              <div>
                <label className="block text-[13px] sm:text-[15px] font-medium text-[#F8FAFC] mb-1.5 sm:mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  autoComplete="postal-code"
                  className="w-full text-[13px] sm:text-[15px] font-normal text-[#F8FAFC] py-3 sm:py-3.5 px-4 sm:px-5 rounded-[14px] sm:rounded-[15px] border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] transition-all"
                />
              </div>

              <div>
                <label className="block text-[13px] sm:text-[15px] font-medium text-[#F8FAFC] mb-1.5 sm:mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  autoComplete="country-name"
                  className="w-full text-[13px] sm:text-[15px] font-normal text-[#F8FAFC] py-3 sm:py-3.5 px-4 sm:px-5 rounded-[14px] sm:rounded-[15px] border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Bottom Save Button */}
          <div className="flex justify-end pt-6 sm:pt-8">
            <button
              type="submit"
              className="w-full sm:w-auto px-16 py-3.5 rounded-[14px] sm:rounded-[15px] bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-[15px] sm:text-[16px] shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Preferences */}
      {activeTab === 'preferences' && (
        <form onSubmit={handlePreferencesSubmit} className="pt-6 sm:pt-8 text-left space-y-6 animate-fade-in-scale">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-5">
            <div>
              <label className="block text-[13px] sm:text-[15px] font-medium text-[#F8FAFC] mb-1.5 sm:mb-2">
                Currency
              </label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                placeholder="USD"
                autoComplete="off"
                className="w-full text-[13px] sm:text-[15px] font-normal text-[#F8FAFC] py-3 sm:py-3.5 px-4 sm:px-5 rounded-[14px] sm:rounded-[15px] border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] transition-all"
              />
            </div>

            <div>
              <label className="block text-[13px] sm:text-[15px] font-medium text-[#F8FAFC] mb-1.5 sm:mb-2">
                Time Zone
              </label>
              <input
                type="text"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                placeholder="(GMT-12:00) International Date Line West"
                autoComplete="off"
                className="w-full text-[13px] sm:text-[15px] font-normal text-[#F8FAFC] py-3 sm:py-3.5 px-4 sm:px-5 rounded-[14px] sm:rounded-[15px] border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] transition-all"
              />
            </div>
          </div>

          {/* Notification Section */}
          <div className="space-y-4 pt-2">
            <h4 className="text-[15px] sm:text-[16px] font-semibold text-[#F8FAFC]">
              Notification
            </h4>

            {/* Item 1 */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    digitalCurrency: !notifications.digitalCurrency
                  })
                }
                className={`w-13 h-7 rounded-full transition-colors relative p-0.5 shrink-0 cursor-pointer ${
                  notifications.digitalCurrency ? 'bg-[#7C3AED]' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-xs transition-transform ${
                    notifications.digitalCurrency ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[13px] sm:text-[15px] text-[#F8FAFC]">
                I send or receive digita currency
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    merchantOrder: !notifications.merchantOrder
                  })
                }
                className={`w-13 h-7 rounded-full transition-colors relative p-0.5 shrink-0 cursor-pointer ${
                  notifications.merchantOrder ? 'bg-[#7C3AED]' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-xs transition-transform ${
                    notifications.merchantOrder ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[13px] sm:text-[15px] text-[#F8FAFC]">
                I receive merchant order
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    recommendations: !notifications.recommendations
                  })
                }
                className={`w-13 h-7 rounded-full transition-colors relative p-0.5 shrink-0 cursor-pointer ${
                  notifications.recommendations ? 'bg-[#7C3AED]' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-xs transition-transform ${
                    notifications.recommendations ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[13px] sm:text-[15px] text-[#F8FAFC]">
                There are recommendation for my account
              </span>
            </div>
          </div>

          <div className="flex justify-end pt-6 sm:pt-8">
            <button
              type="submit"
              className="w-full sm:w-auto px-16 py-3.5 rounded-[14px] sm:rounded-[15px] bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-[15px] sm:text-[16px] shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Security */}
      {activeTab === 'security' && (
        <form onSubmit={handleSecuritySubmit} className="pt-6 sm:pt-8 text-left space-y-6 animate-fade-in-scale">
          {/* Two-factor Authentication */}
          <div className="space-y-3">
            <h4 className="text-[15px] sm:text-[16px] font-semibold text-[#F8FAFC]">
              Two-factor Authentication
            </h4>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setTwoFactor(!twoFactor)}
                className={`w-13 h-7 rounded-full transition-colors relative p-0.5 shrink-0 cursor-pointer ${
                  twoFactor ? 'bg-[#7C3AED]' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-xs transition-transform ${
                    twoFactor ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-[13px] sm:text-[15px] text-[#F8FAFC]">
                Enable or disable two factor authentication
              </span>
            </div>
          </div>

          {/* Change Password */}
          <div className="space-y-4 pt-4">
            <h4 className="text-[15px] sm:text-[16px] font-semibold text-[#F8FAFC]">
              Change Password
            </h4>

            <div className="w-full max-w-[500px]">
              <label className="block text-[13px] sm:text-[15px] font-medium text-[#F8FAFC] mb-1.5 sm:mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="***********"
                autoComplete="current-password"
                className="w-full text-[13px] sm:text-[15px] font-normal text-[#F8FAFC] py-3 sm:py-3.5 px-4 sm:px-5 rounded-[14px] sm:rounded-[15px] border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] font-mono transition-all"
              />
            </div>

            <div className="w-full max-w-[500px]">
              <label className="block text-[13px] sm:text-[15px] font-medium text-[#F8FAFC] mb-1.5 sm:mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="***********"
                autoComplete="new-password"
                className="w-full text-[13px] sm:text-[15px] font-normal text-[#F8FAFC] py-3 sm:py-3.5 px-4 sm:px-5 rounded-[14px] sm:rounded-[15px] border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] font-mono transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6 sm:pt-8">
            <button
              type="submit"
              className="w-full sm:w-auto px-16 py-3.5 rounded-[14px] sm:rounded-[15px] bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-[15px] sm:text-[16px] shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SettingPage;
