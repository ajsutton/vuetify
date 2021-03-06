import VDatePickerTitle from './VDatePickerTitle'
import { test } from '@util/testing'

test('VDatePickerTitle.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VDatePickerTitle, {
      propsData: {
        year: '1234',
        date: '2005-11-01'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component when selecting year and match snapshot', () => {
    const wrapper = mount(VDatePickerTitle, {
      propsData: {
        year: '1234',
        date: '2005-11-01',
        selectingYear: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render year icon', () => {
    const wrapper = mount(VDatePickerTitle, {
      propsData: {
        year: '1234',
        yearIcon: 'year',
        date: '2005-11-01'
      }
    })

    expect(wrapper.find('.date-picker-title__year')[0].html()).toMatchSnapshot()
  })

  it('should emit input event on year/date click', () => {
    const wrapper = mount(VDatePickerTitle, {
      propsData: {
        year: '1234',
        yearIcon: 'year',
        date: '2005-11-01'
      }
    })

    const input = jest.fn(value => wrapper.setProps({ selectingYear: value }))
    wrapper.vm.$on('update:selectingYear', input)

    wrapper.find('.date-picker-title__date')[0].trigger('click')
    expect(input).not.toBeCalled()
    wrapper.find('.date-picker-title__year')[0].trigger('click')
    expect(input).toBeCalledWith(true)
    wrapper.find('.date-picker-title__date')[0].trigger('click')
    expect(input).toBeCalledWith(false)
    wrapper.find('.date-picker-title__year')[0].trigger('click')
    wrapper.find('.date-picker-title__year')[0].trigger('click')
    expect(input).toBeCalledWith(false)
  })
})
