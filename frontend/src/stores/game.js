import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    currentTurn: 'player',
    turnNumber: 1,
    stealthPoints: 5,
    systemIntegrity: 10,

    playerHand: [
      { id: '1', name: 'Hack Pulse', type: 'attack', value: 2, owner: 'player' },
      { id: '2', name: 'Firewall Boost', type: 'defense', value: 3, owner: 'player' }
    ],
    enemyHand: [
      { id: '3', name: 'Malware Strike', type: 'attack', value: 2, owner: 'enemy' }
    ],

    playerField: [],
    enemyField: [],
    drawPile: [],
    graveyard: []
  }),

  actions: {
    endTurn() {
      if (this.currentTurn === 'player') {
        this.currentTurn = 'enemy'
        this.enemyTurn()
      } else {
        this.currentTurn = 'player'
        this.turnNumber++
      }
    },

    playCard(cardId, owner) {
      const hand = owner === 'player' ? this.playerHand : this.enemyHand
      const field = owner === 'player' ? this.playerField : this.enemyField
      const index = hand.findIndex(card => card.id === cardId)
      if (index !== -1) {
        const card = hand.splice(index, 1)[0]
        field.push(card)

        if (card.type === 'attack') {
          if (owner === 'player') {
            this.systemIntegrity -= card.value
          } else {
            this.stealthPoints -= card.value
          }
        } else if (card.type === 'defense') {
          if (owner === 'player') {
            this.stealthPoints += card.value
          } else {
            this.systemIntegrity += card.value
          }
        }
      }
    },

    enemyTurn() {
      if (this.enemyHand.length > 0) {
        const card = this.enemyHand[0]
        this.playCard(card.id, 'enemy')
      }

      setTimeout(() => {
        this.currentTurn = 'player'
        this.turnNumber++
      }, 1000)
    }
  }
})
