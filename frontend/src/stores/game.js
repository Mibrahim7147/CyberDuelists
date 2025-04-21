import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    currentTurn: 'player',
    turnNumber: 0, // Start at turn 0
    stealthPoints: 1000,
    systemIntegrity: 1000,
    canAttack: false, // Controls if attacks are allowed

    playerHand: [],
    enemyHand: [],
    playerField: [],
    enemyField: [],
    drawPile: [],
    graveyard: [],
    allCards: []
  }),

  actions: {
    async fetchCards() {
      try {
        const response = await fetch('http://localhost:5000/api/cards');
        if (!response.ok) throw new Error('Failed to fetch cards');
        const data = await response.json();
        this.allCards = data.cards;
        this.initializeGame();
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    },

    initializeGame() {
      // Initialize draw piles
      const playerCards = this.allCards.filter(card => card.owner === 'player');
      const enemyCards = this.allCards.filter(card => card.owner === 'enemy');
      
      // Shuffle both piles
      this.drawPile = [...playerCards].sort(() => Math.random() - 0.5);
      const enemyDrawPile = [...enemyCards].sort(() => Math.random() - 0.5);
      
      // Draw initial 5 cards for both players
      for (let i = 0; i < 5; i++) {
        if (this.drawPile.length > 0) {
          this.playerHand.push(this.drawPile.pop());
        }
        if (enemyDrawPile.length > 0) {
          this.enemyHand.push(enemyDrawPile.pop());
        }
      }
    },

    drawCards(owner) {
      const hand = owner === 'player' ? this.playerHand : this.enemyHand;
      const drawPile = owner === 'player' ? this.drawPile : this.allCards.filter(card => card.owner === 'enemy');
      
      // Can't draw if hand is full
      if (hand.length >= 7) {
        return;
      }

      // Draw up to 3 cards or until hand is full
      const cardsToDraw = Math.min(3, 7 - hand.length);
      for (let i = 0; i < cardsToDraw; i++) {
        if (drawPile.length > 0) {
          const drawnCard = drawPile.pop();
          hand.push(drawnCard);
        }
      }
    },

    discardToGraveyard(cardId, owner) {
      const hand = owner === 'player' ? this.playerHand : this.enemyHand;
      const index = hand.findIndex(card => card.id === cardId);
      
      if (index !== -1) {
        const card = hand.splice(index, 1)[0];
        this.graveyard.push(card);
      }
    },

    endTurn() {
      if (this.currentTurn === 'player') {
        this.currentTurn = 'enemy';
        this.enemyTurn();
      } else {
        this.currentTurn = 'player';
        this.turnNumber++;
        
        // After turn 0, enable attacks and draw cards
        if (this.turnNumber > 0) {
          this.canAttack = true;
          this.drawCards('player');
        }
      }
    },

    playCard(cardId, owner, targetCardId = null) {
      const hand = owner === 'player' ? this.playerHand : this.enemyHand;
      const field = owner === 'player' ? this.playerField : this.enemyField;
      const opponentField = owner === 'player' ? this.enemyField : this.playerField;
      const index = hand.findIndex(card => card.id === cardId);
      
      if (index !== -1) {
        const card = hand.splice(index, 1)[0];
        field.push(card);

        if (card.type.toLowerCase() === 'attack') {
          if (targetCardId) {
            // Attack specific card
            this.resolveAttackOnCard(card, owner, opponentField, targetCardId);
          } else {
            // Attack directly if no target
            this.resolveAttack(card, owner, opponentField);
          }
        } else if (card.type.toLowerCase() === 'defense') {
          if (owner === 'player') {
            this.stealthPoints += card.defense;
          } else {
            this.systemIntegrity += card.defense;
          }
        } else if (card.type.toLowerCase() === 'reconnaissance') {
          // Handle reconnaissance cards
          if (owner === 'player') {
            this.stealthPoints += card.attack;
          }
        } else if (card.type.toLowerCase() === 'support') {
          // Handle support cards
          if (owner === 'player') {
            this.stealthPoints += card.defense;
          }
        }
      }
    },

    resolveAttack(attackingCard, owner, opponentField) {
      if (!this.canAttack) return;

      // If opponent has no cards, attack directly
      if (opponentField.length === 0) {
        if (owner === 'player') {
          this.systemIntegrity -= attackingCard.attack;
        } else {
          this.stealthPoints -= attackingCard.attack;
        }
        return;
      }

      // Find first defense card
      const defenseCard = opponentField.find(card => card.type.toLowerCase() === 'defense');
      
      if (defenseCard) {
        // Calculate remaining damage after defense
        const remainingDamage = Math.max(0, attackingCard.attack - defenseCard.defense);
        
        // Remove defense card and send to graveyard
        const defenseIndex = opponentField.indexOf(defenseCard);
        opponentField.splice(defenseIndex, 1);
        this.graveyard.push(defenseCard);

        // Apply remaining damage
        if (remainingDamage > 0) {
          if (owner === 'player') {
            this.systemIntegrity -= remainingDamage;
          } else {
            this.stealthPoints -= remainingDamage;
          }
        }
      } else {
        // No defense cards, attack directly
        if (owner === 'player') {
          this.systemIntegrity -= attackingCard.attack;
        } else {
          this.stealthPoints -= attackingCard.attack;
        }
      }
    },

    resolveAttackOnCard(attackingCard, owner, opponentField, targetCardId) {
      if (!this.canAttack) return;

      const targetCard = opponentField.find(card => card.id === targetCardId);
      if (!targetCard) {
        // If target not found, attack directly
        if (owner === 'player') {
          this.systemIntegrity -= attackingCard.attack;
        } else {
          this.stealthPoints -= attackingCard.attack;
        }
        return;
      }

      // Handle the attack based on target card type
      if (targetCard.type.toLowerCase() === 'defense') {
        // Calculate remaining damage after defense
        const remainingDamage = Math.max(0, attackingCard.attack - targetCard.defense);
        
        // Remove defense card and send to graveyard
        const targetIndex = opponentField.indexOf(targetCard);
        opponentField.splice(targetIndex, 1);
        this.graveyard.push(targetCard);

        // Apply remaining damage
        if (remainingDamage > 0) {
          if (owner === 'player') {
            this.systemIntegrity -= remainingDamage;
          } else {
            this.stealthPoints -= remainingDamage;
          }
        }
      } else {
        // For non-defense cards, destroy them and apply full damage
        const targetIndex = opponentField.indexOf(targetCard);
        opponentField.splice(targetIndex, 1);
        this.graveyard.push(targetCard);

        if (owner === 'player') {
          this.systemIntegrity -= attackingCard.attack;
        } else {
          this.stealthPoints -= attackingCard.attack;
        }
      }
    },

    enemyTurn() {
      if (this.turnNumber > 0) {
        this.drawCards('enemy');
      }

      if (this.enemyHand.length > 0) {
        const card = this.enemyHand[0];
        this.playCard(card.id, 'enemy');
      }

      setTimeout(() => {
        this.currentTurn = 'player';
        this.turnNumber++;
      }, 1000);
    }
  }
})
