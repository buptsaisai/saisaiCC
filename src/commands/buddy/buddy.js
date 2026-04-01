/**
 * Buddy command action handlers
 */
import { getGlobalConfig } from '../../utils/config.js'
import { hatchCompanion, getCompanion } from '../../buddy/companion.js'

export const call = async (args, context) => {
  // Parse args - they come as a string like "pet" or "hatch"
  const subcommand = args.trim().split(/\s+/)[0] || 'help'

  switch (subcommand) {
    case 'pet':
      return {
        type: 'text',
        value: 'You pet your companion. It seems happy!'
      }
    case 'feed':
      return {
        type: 'text',
        value: 'You feed your companion. It enjoys the meal!'
      }
    case 'status':
      const config = getGlobalConfig()
      const companion = config.companion
      if (companion) {
        return {
          type: 'text',
          value: `Your companion: ${companion.name} (${companion.species})\nRarity: ${companion.rarity}\nPersonality: ${companion.personality}`
        }
      } else {
        return {
          type: 'text',
          value: 'You don\'t have a companion yet. Use /buddy hatch to get one!'
        }
      }
    case 'hatch':
      if (getGlobalConfig().companion) {
        return {
          type: 'text',
          value: 'You already have a companion!'
        }
      }
      // Hatch a new companion
      const newCompanion = hatchCompanion()
      return {
        type: 'text',
        value: `A new ${newCompanion.species} named ${newCompanion.name} has joined you!`
      }
    case 'help':
    default:
      return {
        type: 'text',
        value: `Buddy Commands:
  /buddy pet     - Pet your companion
  /buddy feed    - Feed your companion
  /buddy status  - Check your companion's status
  /buddy hatch   - Hatch a new companion
  /buddy help    - Show this help message`
      }
  }
}

export default call
