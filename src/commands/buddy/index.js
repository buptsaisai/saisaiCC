/**
 * Buddy command - interact with your companion
 * MODIFIED: Created to enable buddy functionality
 */

export default {
  type: 'local',
  name: 'buddy',
  description: 'Interact with your companion buddy',
  load: () => import('./buddy.js'),
}
