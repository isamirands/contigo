# Mystery Box Daily Reward System

## Overview
The Mystery Box is a daily reward system that appears when users complete all their daily habits and their Tigo reaches the end of the journey strip.

## Features

### 1. Trigger Conditions
The Mystery Box appears when:
- ✅ All daily habits are completed (100% progress)
- ✅ Tigo has reached the end of the journey strip (progress === 100%)
- ✅ User hasn't claimed their reward today

### 2. Reward Types
When opened, the Mystery Box randomly reveals one of two reward types:

#### Cosmetic Items (50% chance)
- Hat, scarf, sunglasses, crown, or top hat
- Adds visual customization to the Tigo avatar
- Stored in user's collection

#### CuidaFarma Discount (50% chance)
- 10%, 15%, or 20% discount codes
- Can be copied with one tap
- Valid for use in the CuidaFarma app

### 3. User Experience

#### Before Opening
- Centered modal with gift box icon
- Celebratory message: "¡Mystery Box para Tigo!"
- "Has completado todos tus hábitos de hoy 🎉"
- Primary button: "Abrir"
- Option to dismiss and open later

#### After Opening
- Animated reveal of the reward
- For cosmetics: Large emoji display with name and description
- For discounts: Discount percentage, code, and copy button
- Confirmation button: "¡Genial!"

#### Floating Badge
- If dismissed, a floating badge appears in the bottom-right
- Bouncing animation with notification dot
- Allows reopening the Mystery Box
- Disappears after reward is claimed

### 4. Daily Limit
- Only one reward per day
- Uses localStorage to track: `lastClaimedRewardDate`
- Resets at midnight (new date string)
- Cannot claim multiple times on the same day

## Implementation Details

### State Management
```typescript
const [mysteryBoxOpen, setMysteryBoxOpen] = useState(false);
const [hasClaimedDailyReward, setHasClaimedDailyReward] = useState(false);
```

### Trigger Logic
```typescript
const allHabitsCompleted = activityPool.length > 0 && 
  completedActivities.length === activityPool.length;
const tigoReachedEnd = progress === 100;
const shouldShowMysteryBox = allHabitsCompleted && 
  tigoReachedEnd && 
  !hasClaimedDailyReward;
```

### Reward Selection
```typescript
const rewardType = Math.random() < 0.5 ? "cosmetic" : "cuidafarma";
```

## Future Enhancements
- [ ] Backend integration for reward persistence
- [ ] Actual Tigo avatar customization system
- [ ] CuidaFarma API integration for discount validation
- [ ] Reward history/collection view
- [ ] Rarity tiers (common, rare, epic)
- [ ] Special event rewards
- [ ] Streak bonuses for consecutive days
