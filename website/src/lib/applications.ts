export function isApplicationsOpen(settingValue: any): boolean {
  if (settingValue === undefined || settingValue === null) return true;
  if (settingValue === true || settingValue === 'true' || settingValue === 1 || settingValue === '1') return true;
  if (settingValue === false || settingValue === 'false' || settingValue === 0 || settingValue === '0') return false;
  
  if (typeof settingValue === 'object') {
    if (settingValue.type === 'open') return true;
    if (settingValue.type === 'closed') return false;
    if (settingValue.type === 'scheduled') {
      const now = new Date();
      if (settingValue.startDate && new Date(settingValue.startDate) > now) return false;
      if (settingValue.endDate && new Date(settingValue.endDate) < now) return false;
      return true;
    }
  }
  return true;
}
