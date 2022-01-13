import { shallowMount } from '@vue/test-utils';
import 'jest-localstorage-mock';
import RecordsList from '@/components/RecordsList.vue';

describe('RecordsList.vue', () => {
  it('gets records from local storage', () => {
    shallowMount(RecordsList, {});
    expect(localStorage.getItem).toHaveBeenCalledWith('records');
  });
});
