import { mount } from '@vue/test-utils';
import SliderPuzzle from '@/components/SliderPuzzle.vue';
import 'jest-localstorage-mock';

let wrapper;

describe('Tests with simple setup', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');
    jest.spyOn(global, 'clearInterval');
    wrapper = mount(SliderPuzzle);
  });

  it('inserts the index of the image to swap when we click on an image', () => {
    wrapper.find('#start-button').trigger('click');
    wrapper.find('img').trigger('click');
    expect(wrapper.vm.indexesToSwap.length).toBeGreaterThan(0);
  });

  it('swaps the image order when 2 images are clicked', () => {
    wrapper.find('#start-button').trigger('click');
    const [firstImage, secondImage] = wrapper.vm.shuffledPuzzleArray;
    wrapper.get('.column:nth-child(1) img').trigger('click');
    wrapper.get('.column:nth-child(2) img').trigger('click');
    expect(wrapper.vm.indexesToSwap.length).toBe(0);
    const [newFirstImage, newSecondImage] = wrapper.vm.shuffledPuzzleArray;
    expect(firstImage).toBe(newSecondImage);
    expect(secondImage).toBe(newFirstImage);
  });

  it('starts timer when start method is called', () => {
    wrapper.vm.start();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  it('stops timer when stop method is called', () => {
    wrapper.vm.stop();
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  it('starts timer with Start button is clicked', () => {
    wrapper.get('#start-button').trigger('click');
    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  it('stops timer with Quit button is clicked', () => {
    wrapper.get('#quit-button').trigger('click');
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});

describe('Tests with complicated setup', () => {
  it('records record to local storage', () => {
    wrapper = mount(SliderPuzzle, {
      data() {
        return {
          currentDateTime: new Date(),
          startDateTime: new Date(),
        };
      },
    });
    wrapper.vm.recordSpeedRecords();
    const { elapsedDiff, elapsedTime } = wrapper.vm;
    const stringifiedRecords = JSON.stringify([{ elapsedTime, elapsedDiff }]);
    expect(localStorage.setItem).toHaveBeenCalledWith('records', stringifiedRecords);
  });

  it('shows the elapsed time', () => {
    wrapper = mount(SliderPuzzle, {
      data() {
        return {
          currentDateTime: new Date(2020, 0, 1, 0, 0, 1),
          startDateTime: new Date(2020, 0, 1, 0, 0, 0),
        };
      },
    });
    expect(wrapper.html()).toContain('00:00:01');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
