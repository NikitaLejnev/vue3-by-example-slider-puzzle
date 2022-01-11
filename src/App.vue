<template>
  <div>
    <PuzzleSelect @puzzle-changed="selectedPuzzleId = $event" />
    <RecordsList />
    <SliderPuzzle :puzzleId="selectedPuzzleId" />
  </div>
</template>

<script>
import PuzzleSelect from './components/PuzzleSelect.vue';
import RecordsList from './components/RecordsList.vue';
import SliderPuzzle from './components/SliderPuzzle.vue';

export default {
  name: 'App',
  components: { PuzzleSelect, RecordsList, SliderPuzzle },
  data() {
    return { selectedPuzzleId: 'cut-pink' };
  },
};
</script>
