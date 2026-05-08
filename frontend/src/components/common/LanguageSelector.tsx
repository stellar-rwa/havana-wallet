// frontend/src/components/common/LanguageSelector.tsx
"use client";

export const LanguageSelector = () => {
  const languages = [
    { code: 'en', label: 'English', dir: 'ltr' },
    { code: 'ar', label: 'العربية', dir: 'rtl' },
    { code: 'fr', label: 'Français', dir: 'ltr' },
    { code: 'sw', label: 'Kiswahili', dir: 'ltr' },
  ];

  return (
    <select className="bg-surface-elevated text-text-primary border border-border-primary rounded-lg px-2 py-1 text-sm outline-none">
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>{lang.label}</option>
      ))}
    </select>
  );
};
