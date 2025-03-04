import { sampleProfiles } from './sampleProfiles';

/**
 * Load sample user profiles into localStorage for testing
 * @param replace Whether to replace existing profiles or preserve them
 */
export function loadSampleProfiles(replace: boolean = false): void {
  // Check if users already exist in localStorage
  const existingUsersString = localStorage.getItem('skillswap_users');
  let existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];
  
  // If replace is true or no users exist, use sample profiles
  // Otherwise, merge sample profiles with existing users
  if (replace || existingUsers.length === 0) {
    localStorage.setItem('skillswap_users', JSON.stringify(sampleProfiles));
    console.log('Sample profiles loaded:', sampleProfiles.length);
  } else {
    // Filter out sample profiles that have the same email as existing users
    const existingEmails = existingUsers.map((user: any) => user.email);
    const newProfiles = sampleProfiles.filter(profile => !existingEmails.includes(profile.email));
    
    // Add new sample profiles to existing users
    const mergedUsers = [...existingUsers, ...newProfiles];
    localStorage.setItem('skillswap_users', JSON.stringify(mergedUsers));
    console.log('Added', newProfiles.length, 'sample profiles to existing', existingUsers.length, 'users');
  }
}
