'use client';

import { useTransition, useState } from 'react';
import { Loader2, Calendar } from 'lucide-react';
import { setApplicationsSetting } from './actions';

export type ApplicationSettingValue = boolean | {
  type: 'open' | 'closed' | 'scheduled';
  startDate?: string;
  endDate?: string;
  capacityLimit?: number;
  launchName?: string;
};

export function ApplicationSettings({ initialSetting }: { initialSetting: ApplicationSettingValue }) {
  const [setting, setSetting] = useState<ApplicationSettingValue>(initialSetting);
  const [isPending, startTransition] = useTransition();

  const currentType = typeof setting === 'object' ? setting.type : (setting ? 'open' : 'closed');
  
  const getLocalDatetimeString = (isoString?: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const startDate = typeof setting === 'object' ? getLocalDatetimeString(setting.startDate) : '';
  const endDate = typeof setting === 'object' ? getLocalDatetimeString(setting.endDate) : '';

  const handleChange = (newSetting: ApplicationSettingValue) => {
    let finalSetting = newSetting;
    if (typeof setting === 'object' && typeof newSetting === 'object') {
      finalSetting = { ...setting, ...newSetting };
    } else if (typeof setting === 'object' && typeof newSetting === 'boolean') {
      finalSetting = { ...setting, type: newSetting ? 'open' : 'closed' };
    }
    setSetting(finalSetting);
  };

  const handleSave = () => {
    startTransition(async () => {
      const res = await setApplicationsSetting(setting);
      if (res.error) {
        alert(res.error);
        setSetting(initialSetting); // revert on error
      } else {
        alert('Settings saved successfully!');
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="app_status"
            checked={currentType === 'open'}
            onChange={() => handleChange({ type: 'open' })}
            className="text-brand-green-primary focus:ring-brand-green-primary"
            disabled={isPending}
          />
          <span className="text-sm font-medium">Always Open</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="app_status"
            checked={currentType === 'closed'}
            onChange={() => handleChange({ type: 'closed' })}
            className="text-brand-green-primary focus:ring-brand-green-primary"
            disabled={isPending}
          />
          <span className="text-sm font-medium">Always Closed</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="app_status"
            checked={currentType === 'scheduled'}
            onChange={() => {
               const base = typeof setting === 'object' ? setting : ({} as Record<string, any>);
               handleChange({ type: 'scheduled', startDate: base.startDate, endDate: base.endDate });
            }}
            className="text-brand-green-primary focus:ring-brand-green-primary"
            disabled={isPending}
          />
          <span className="text-sm font-medium">Scheduled</span>
        </label>
      </div>

      {currentType === 'scheduled' && (
        <div className="flex flex-col sm:flex-row gap-4 mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Start Date & Time (Optional)</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => handleChange({ type: 'scheduled', startDate: e.target.value ? new Date(e.target.value).toISOString() : undefined })}
              disabled={isPending}
              className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-primary"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">End Date & Time (Optional)</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => handleChange({ type: 'scheduled', endDate: e.target.value ? new Date(e.target.value).toISOString() : undefined })}
              disabled={isPending}
              className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-primary"
            />
          </div>
        </div>
      )}

      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Launch / Cohort Name (Optional)</label>
        <p className="text-xs text-gray-500 mb-3">This name will be displayed on the website (e.g., "Cohort 1 - Sept 5").</p>
        <input
          type="text"
          placeholder="e.g. Cohort 1 - Sept 5"
          value={(typeof setting === 'object' && setting.launchName) ? setting.launchName : ''}
          onChange={(e) => {
            const val = e.target.value || undefined;
            if (typeof setting === 'object') {
              handleChange({ ...setting, launchName: val });
            } else {
              handleChange({ type: setting ? 'open' : 'closed', launchName: val });
            }
          }}
          disabled={isPending}
          className="w-full max-w-sm px-3 py-2 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-primary mb-4"
        />

        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 border-t border-gray-200 dark:border-gray-700 pt-4">Maximum Accepted Members Cap (Optional)</label>
        <p className="text-xs text-gray-500 mb-3">If set, applications will automatically close once this many applicants have been accepted.</p>
        <input
          type="number"
          min="1"
          placeholder="e.g. 100"
          value={(typeof setting === 'object' && setting.capacityLimit) ? setting.capacityLimit : ''}
          onChange={(e) => {
            const val = e.target.value ? parseInt(e.target.value) : undefined;
            if (typeof setting === 'object') {
              handleChange({ ...setting, capacityLimit: val });
            } else {
              handleChange({ type: setting ? 'open' : 'closed', capacityLimit: val });
            }
          }}
          disabled={isPending}
          className="w-full max-w-xs px-3 py-2 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-primary"
        />
      </div>
      
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end gap-4">
        {isPending && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" /> Saving...
          </div>
        )}
        <button
          onClick={handleSave}
          disabled={isPending}
          className="bg-brand-green-primary hover:bg-brand-green-primary/90 text-white px-6 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors disabled:opacity-50"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
