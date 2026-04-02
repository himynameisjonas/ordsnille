# Cursor Editing & Placeholders for Wordle-Style Boards

This document describes the cursor-editing feature and placeholder behavior added to this Wordle clone. It is designed to be reusable in other Wordle-style implementations.

---

## Summary

The game now supports:

- **Click-to-place cursor** on the current guess row.
- **Arrow key navigation** (left/right).
- **Replace mode typing** (letters overwrite the current slot).
- **Space key** to clear a slot and advance (placeholder/skip behavior).
- **Backspace behavior** that respects manual cursor movement.
- **Cursor never moves beyond the last slot** (index 4), but can sit on the first empty slot for normal typing.

---

## Key UX Behaviors

### 1) Cursor Placement
- Clicking a tile on the **current row** moves the cursor to that tile.
- Cursor placement is ignored for previous rows.

### 2) Cursor Movement
- **ArrowLeft / ArrowRight** moves the cursor left/right.
- Cursor is clamped between index `0` and `4`.
- The cursor **never goes past the last slot**.

### 3) Replace Mode Typing
- Typing a letter **replaces** the letter at the cursor position.
- After typing, the cursor moves right (but never beyond index `4`).

### 4) Space to Skip / Clear
- Pressing **space** clears the **current slot** (sets it to empty).
- Then the cursor moves one step right (within range).

### 5) Backspace Rules
Backspace behaves differently depending on how the cursor was moved:

#### A) Manual Cursor Movement
If you moved the cursor with a click or arrow keys:
- Backspace clears the **current slot**.
- Cursor stays on that slot.
- After that, manual mode resets.

#### B) Normal Typing Flow
If you are typing normally (no manual cursor movement):
- Backspace clears the **previous slot**, similar to standard Wordle.
- **Special case** when cursor is on the last slot (index `4`):
  - If that slot is already empty, backspace moves left and clears index `3`.
  - This allows repeated backspacing to delete multiple letters in a row.

---

## Practical Examples

### Example 1: Editing a Known Pattern
You can fill known positions using the cursor:

1. Click slot 0, type `R`
2. Click slot 3, type `H`
3. Click slot 4, type `T`

You now have: `R__HT`.

### Example 2: Skipping Unknown Letters
- Click slot 0 → type `R`
- Press **space** → skip slot 1
- Press **space** → skip slot 2
- Type `H` and `T` in slots 3 and 4

### Example 3: Backspace After Manual Move
1. Click slot 2 (manual cursor move)
2. Press backspace  
→ slot 2 clears (does not remove slot 1)

### Example 4: Backspace After Typing
1. Type 5 letters: cursor ends at index 4  
2. Press backspace  
→ clears index 4  
3. Press backspace again  
→ clears index 3  
(and so on)

---

## Implementation Notes (Framework-Agnostic)

These are the core concepts you’ll want in any implementation:

### Cursor State
Maintain a cursor state with:
- `boardIndex`
- `letterIndex`

### Manual Movement Flag
Track whether the cursor was moved manually:
- `cursorMovedManually = true` on click or arrow keys
- Reset to `false` after typing or clearing with space

### Placeholder Handling
To allow gaps:
- Store empty slots as `""` (or `" "` if a string model is required)
- Normalize to a fixed length array of 5 when editing

---

## Integration Checklist

- [ ] Make tiles on current row clickable to set cursor
- [ ] Add left/right arrow key listeners
- [ ] Implement replace-on-type
- [ ] Space clears current slot and advances cursor
- [ ] Backspace follows manual vs. auto behavior
- [ ] Ensure cursor never moves beyond index `4`

---

## Notes for Porting

If your model stores guesses as strings, consider:
- Converting to a **5-slot array** for editing
- Converting back to string after edits
- Using `" "` as a placeholder for empty slots so string length stays stable

---

## Optional Enhancements

- Show a blinking caret overlay in the active tile
- Add keyboard shortcuts for jump to first/last slot
- Allow dragging across tiles to set cursor

---

If you want help adapting this to a different framework or data model, I can provide a tailored version.