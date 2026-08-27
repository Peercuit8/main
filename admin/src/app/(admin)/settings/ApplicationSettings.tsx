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
  const startDate = typeof setting === 'object' && setting.startDate ? setting.startDate.substring(0, 16) : '';
  const endDate = typeof setting === 'object' && setting.endDate ? setting.endDate.substring(0, 16) : '';

  const handleSave = (newSetting: ApplicationSettingValue) => {
    setSetting(newSetting);
    startTransition(async () => {
      const res = await setApplicationsSetting(newSetting);
      if (res.error) {
        alert(res.error);
        setSetting(setting); // revert on error
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
            onChange={() => handleSave({ type: 'open' })}
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
            onChange={() => handleSave({ type: 'closed' })}
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
            onChange={() => handleSave({ type: 'scheduled', startDate, endDate })}
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
              onChange={(e) => handleSave({ type: 'scheduled', startDate: e.target.value ? new Date(e.target.value).toISOString() : undefined, endDate: typeof setting === 'object' ? setting.endDate : undefined })}
              disabled={isPending}
              className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-primary"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">End Date & Time (Optional)</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => handleSave({ type: 'scheduled', startDate: typeof setting === 'object' ? setting.startDate : undefined, endDate: e.target.value ? new Date(e.target.value).toISOString() : undefined })}
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
              handleSave({ ...setting, launchName: val });
            } else {
              handleSave({ type: setting ? 'open' : 'closed', launchName: val });
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
              handleSave({ ...setting, capacityLimit: val });
            } else {
              handleSave({ type: setting ? 'open' : 'closed', capacityLimit: val });
            }
          }}
          disabled={isPending}
          className="w-full max-w-xs px-3 py-2 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green-primary"
        />
      </div>
      
      {isPending && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin" /> Saving...
        </div>
      )}
    </div>
  );
}
