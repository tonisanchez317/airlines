import { shallowMount } from '@vue/test-utils';
import AlertComponent from './AlertComponent.vue';
import ALERT_TYPES from './types';

const alertTypes = [
  ...Object.values(ALERT_TYPES),
  'test',
];

describe('Given AlertComponent', () => {
  alertTypes.forEach(alertType => {
    describe(`When component receives alert type "${alertType}"`, () => {
      it('Then HTML rendered should be the same than original snapshot', () => {
        const wrapper = shallowMount(AlertComponent, {
          propsData: {
            type: alertType,
          },
        });

        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
