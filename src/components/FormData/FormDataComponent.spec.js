import { shallowMount, mount } from '@vue/test-utils';
import FormDataComponent from './FormDataComponent.vue';

let wrapper;

jest.mock('./data/countries.json', () => ({
  data: [
    'Spain',
    'USA',
    'France',
  ],
}));

describe('Given FormDataComponent', () => {
  describe('When component does not receive a value', () => {
    beforeEach(() => {
      wrapper = shallowMount(FormDataComponent);
    });
    it('Then state computed should be an empty object', () => {
      expect(wrapper.vm.value).toEqual(null);
    });
    it('Then HTML rendered should be the same than original snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('When component receives a value', () => {
    beforeEach(() => {
      wrapper = mount(FormDataComponent, {
        propsData: {
          value: {
            id: 1,
            iata: 'iata test',
            icao: 'icao test',
            airline: 'airline test',
            callsign: 'callsign test',
            country: 'Spain',
          },
        },
      });
    });
    describe('And this data is edited by the user', () => {
      it('Then value should be updated', async () => {
        const iata = wrapper.find('#iata');
        await iata.setValue('new iata value');

        const icao = wrapper.find('#icao');
        await icao.setValue('new icao value');

        const airline = wrapper.find('#airline');
        await airline.setValue('new airline value');

        const callsign = wrapper.find('#callsign');
        await callsign.setValue('new callsign value');

        const country = wrapper.find('#country');
        await country.setValue('USA');

        expect(wrapper.vm.value.iata).toEqual('new iata value');
        expect(wrapper.vm.value.icao).toEqual('new icao value');
        expect(wrapper.vm.value.airline).toEqual('new airline value');
        expect(wrapper.vm.value.callsign).toEqual('new callsign value');
        expect(wrapper.vm.value.country).toEqual('USA');
      });
    });
    it('Then value prop should be returned as state', () => {
      expect(wrapper.vm.state).toEqual({
        id: 1,
        iata: 'iata test',
        icao: 'icao test',
        airline: 'airline test',
        callsign: 'callsign test',
        country: 'Spain',
      });
    });
    it('Then HTML rendered should be the same than original snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('Then inputs should be filled with that data', () => {
      expect(wrapper.find('#iata').element.value).toEqual('iata test');
      expect(wrapper.find('#icao').element.value).toEqual('icao test');
      expect(wrapper.find('#airline').element.value).toEqual('airline test');
      expect(wrapper.find('#callsign').element.value).toEqual('callsign test');
      expect(wrapper.find('#country').element.value).toEqual('Spain');
    });
  });
});
