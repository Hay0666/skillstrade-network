
import { User, UserMatch } from '@/types/user';

/**
 * Find potential skill matches for a user
 * @param currentUser The current user to find matches for
 * @returns Array of user matches
 */
export function findSkillMatches(currentUser: User): UserMatch[] {
  // Get all users from localStorage
  const usersString = localStorage.getItem('skillswap_users');
  if (!usersString) return [];
  
  const allUsers: User[] = JSON.parse(usersString);
  
  // Filter out the current user
  const otherUsers = allUsers.filter(user => user.id !== currentUser.id);
  
  // Find potential matches
  const matches: UserMatch[] = otherUsers
    .map(user => {
      // Skills the other user can teach that the current user wants to learn
      const canTeachYou = user.teachSkills.filter(skill => 
        currentUser.learnSkills.includes(skill)
      );
      
      // Skills the current user can teach that the other user wants to learn
      const youCanTeach = currentUser.teachSkills.filter(skill => 
        user.learnSkills.includes(skill)
      );
      
      // Only consider it a match if there's at least one skill in each direction
      if (canTeachYou.length === 0 || youCanTeach.length === 0) {
        return null;
      }
      
      // Calculate a match score based on the number of matching skills
      const totalPossibleSkills = Math.max(
        currentUser.learnSkills.length + currentUser.teachSkills.length,
        user.learnSkills.length + user.teachSkills.length
      );
      
      const matchingSkillsCount = canTeachYou.length + youCanTeach.length;
      const matchScore = Math.round((matchingSkillsCount / totalPossibleSkills) * 100);
      
      // Fix: Create a UserMatch object with correct optional profilePicture
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture, // This is now correctly optional
        matchScore,
        canTeachYou,
        youCanTeach
      } as UserMatch; // Explicitly cast to UserMatch to ensure type compatibility
    })
    .filter((match): match is NonNullable<typeof match> => match !== null) // Fix: Use a more generic type predicate
    .sort((a, b) => b.matchScore - a.matchScore); // Sort by match score descending
  
  return matches;
}

/**
 * Update matches for all users when a user updates their skills
 * This function would be called after a user updates their profile
 */
export function updateMatchesForAllUsers(): void {
  const usersString = localStorage.getItem('skillswap_users');
  if (!usersString) return;
  
  // For a real app, this would trigger server-side recalculations
  // For this demo, matches are calculated on-demand when users visit their matches page
  console.log('Skill matches updated for all users');
}
