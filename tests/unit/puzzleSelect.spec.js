import { mount } from '@vue/test-utils';
import PuzzleSelect from '@/components/PuzzleSelect.vue';

describe('PuzzleSelect.vue', () => {
  it('emit puzzle-changed event when Play button is clicked', () => {
    const wrapper = mount(PuzzleSelect);
    wrapper.find('.play-button button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('puzzle-changed');
  });

  it(
    'emit puzzle-changed event with the puzzle ID when Play button is clicked',
    () => {
      const wrapper = mount(PuzzleSelect);
      wrapper.find('.play-button button').trigger('click');
      const puzzleChanged = wrapper.emitted('puzzle-changed');
      expect(puzzleChanged[0]).toEqual([wrapper.vm.puzzles[0].id]);
    },
  );
});
