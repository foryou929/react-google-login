import React from 'react'
import { create } from 'react-test-renderer'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { GoogleLogin as GoogleLoginDist } from '../dist/google-login'

configure({ adapter: new Adapter() })

describe('Google Login Dist', () => {
  const defaultText = 'Login with Google'

  describe('With default props', () => {
    const props = {
      onSuccess() {},
      onFailure() {},
      clientId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
    }

    test('render the button', () => {
      const component = create(<GoogleLoginDist {...props} />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    const button = shallow(<GoogleLoginDist {...props} />)

    test('displays correct button text', () => {
      expect(button.text()).toEqual(defaultText)
    })

    test('does not have a class attr', () => {
      expect(button.prop('className')).toEqual(undefined)
    })

    test('has inline styles', () => {
      expect(button.prop('style')).toMatchSnapshot()
    })

    test('displays a button element when tag prop is not set', () => {
      expect(button.type()).toEqual('button')
    })
  })
  describe('With custom text and default props', () => {
    const buttonText = 'buttonText'

    const props = {
      onSuccess() {},
      onFailure() {},
      clientId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com',
      buttonText
    }

    test('render the button', () => {
      const component = create(<GoogleLoginDist {...props} />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    const button = shallow(<GoogleLoginDist {...props} />)

    test('displays correct button text', () => {
      expect(button.text()).toEqual(buttonText)
    })

    test('does not have a class attr', () => {
      expect(button.prop('className')).toEqual(undefined)
    })

    test('has inline styles', () => {
      expect(button.prop('style')).toMatchSnapshot()
    })

    test('displays a button element when tag prop is not set', () => {
      expect(button.type()).toEqual('button')
    })
  })
  describe('With custom class and default props', () => {
    const className = 'test-class'

    const props = {
      onSuccess() {},
      onFailure() {},
      clientId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com',
      className
    }

    test('render the button', () => {
      const component = create(<GoogleLoginDist {...props} />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    const button = shallow(<GoogleLoginDist {...props} />)

    test('displays correct button text', () => {
      expect(button.text()).toEqual(defaultText)
    })

    test('does not have a class attr', () => {
      expect(button.prop('className')).toEqual(className)
    })

    test('has inline styles', () => {
      expect(button.prop('style')).toMatchSnapshot()
    })

    test('displays a button element when tag prop is not set', () => {
      expect(button.type()).toEqual('button')
    })
  })
  describe('With custom class and custom style', () => {
    const className = 'test-class'
    const style = { color: 'red' }
    const props = {
      onSuccess() {},
      onFailure() {},
      clientId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com',
      className,
      style
    }

    test('render the button', () => {
      const component = create(<GoogleLoginDist {...props} />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    const button = shallow(<GoogleLoginDist {...props} />)

    test('displays correct button text', () => {
      expect(button.text()).toEqual(defaultText)
    })

    test('does not have a class attr', () => {
      expect(button.prop('className')).toEqual(className)
    })

    test('has inline styles', () => {
      expect(button.prop('style')).toMatchSnapshot()
    })

    test('displays a button element when tag prop is not set', () => {
      expect(button.type()).toEqual('button')
    })
  })
  describe('With children, custom text, and default props', () => {
    const children = 'test'
    const buttonText = 'buttonText'
    const props = {
      onSuccess() {},
      onFailure() {},
      clientId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com',
      buttonText
    }

    test('render the button', () => {
      const component = create(<GoogleLoginDist {...props}>{children}</GoogleLoginDist>)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    const button = shallow(<GoogleLoginDist {...props}>{children}</GoogleLoginDist>)

    test('displays correct button text', () => {
      expect(button.text()).toEqual(children)
    })

    test('does not have a class attr', () => {
      expect(button.prop('className')).toEqual(undefined)
    })

    test('has inline styles', () => {
      expect(button.prop('style')).toMatchSnapshot()
    })

    test('displays a button element when tag prop is not set', () => {
      expect(button.type()).toEqual('button')
    })
  })
  describe('With handles custom tag prop', () => {
    const tag = 'div'

    const props = {
      onSuccess() {},
      onFailure() {},
      clientId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com',
      tag
    }

    test('render the button', () => {
      const component = create(<GoogleLoginDist {...props} />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    const button = shallow(<GoogleLoginDist {...props} />)

    test('displays correct button text', () => {
      expect(button.text()).toEqual(defaultText)
    })

    test('does not have a class attr', () => {
      expect(button.prop('className')).toEqual(undefined)
    })

    test('has inline styles', () => {
      expect(button.prop('style')).toMatchSnapshot()
    })

    test('displays a button element when tag prop is not set', () => {
      expect(button.type()).toEqual(tag)
    })
  })
})

//   describe('', () => {
//     beforeEach(() => {
//       propsObj = {
//         onSuccess(response) {},
//         onFailure(response) {},
//         clientId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
//       }
//       component = renderComponent(GoogleLoginDist, propsObj)
//     })

//     test('shows the button', () => {
//       expect(component).to.exist
//     })

//     test('displays a div element when tag prop is set to div', () => {
//       expect(component.get(0).tagName).to.equal('DIV')
//     })
//   })
// })

// describe('Google Login Dist', () => {
//   const defaultText = 'Login with Google'
//   let component
//   let propsObj

//   describe('With default props', () => {
//     beforeEach(() => {
//       propsObj = {
//         onSuccess(response) {},
//         onFailure(response) {},
//         clientId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
//       }
//       component = renderComponent(GoogleLoginDistDist, propsObj)
//     })

//     test('shows the button', () => {
//       expect(component).to.exist
//     })

//     test('displays correct button text', () => {
//       expect(component).to.have.text(defaultText)
//     })

//     test('does not have a class attr', () => {
//       expect(component).to.not.have.attr('class')
//     })

//     test('has inline styles', () => {
//       expect(component).to.have.attr('style')
//     })

//     test('displays a button element when tag prop is not set', () => {
//       expect(component.get(0).tagName).to.equal('BUTTON')
//     })
//   })
//   describe('With custom text and default props', () => {
//     const buttonText = 'buttonText'

//     beforeEach(() => {
//       propsObj = {
//         onSuccess(response) {},
//         onFailure(response) {},
//         clientId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com',
//         buttonText
//       }
//       component = renderComponent(GoogleLoginDistDist, propsObj)
//     })

//     test('shows the button', () => {
//       expect(component).to.exist
//     })

//     test('displays correct button text', () => {
//       expect(component).to.have.text(buttonText)
//     })

//     test('does not have a class attr', () => {
//       expect(component).to.not.have.attr('class')
//     })

//     test('has inline styles', () => {
//       expect(component).to.have.attr('style')
//     })
//   })
//   describe('With custom class and default props', () => {
//     const className = 'test-class'

//     beforeEach(() => {
//       propsObj = {
//         onSuccess(response) {},
//         onFailure(response) {},
//         clientId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com',
//         className
//       }
//       component = renderComponent(GoogleLoginDistDist, propsObj)
//     })

//     test('shows the button', () => {
//       expect(component).to.exist
//     })

//     test('displays correct button text', () => {
//       expect(component).to.have.text(defaultText)
//     })

//     test('has a class attr with custom class', () => {
//       expect(component).to.have.attr('class', className)
//     })

//     test('does not have inline styles', () => {
//       expect(component).to.have.attr('style')
//     })
//   })
//   describe('With custom class and custom style', () => {
//     const className = 'test-class'
//     const style = { color: 'red' }

//     beforeEach(() => {
//       propsObj = {
//         onSuccess(response) {},
//         onFailure(response) {},
//         clientId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com',
//         className,
//         style
//       }
//       component = renderComponent(GoogleLoginDistDist, propsObj)
//     })

//     test('shows the button', () => {
//       expect(component).to.exist
//     })

//     test('displays correct button text', () => {
//       expect(component).to.have.text(defaultText)
//     })

//     test('has a class attr with custom class', () => {
//       expect(component).to.have.attr('class', className)
//     })

//     test('to have custom inline styles', () => {
//       expect(component).to.have.attr('style')
//     })
//   })
//   describe('With children, custom text, and default props', () => {
//     const children = 'test'
//     const buttonText = 'buttonText'

//     beforeEach(() => {
//       propsObj = {
//         onSuccess(response) {},
//         onFailure(response) {},
//         clientId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com',
//         children,
//         buttonText
//       }
//       component = renderComponent(GoogleLoginDistDist, propsObj)
//     })

//     test('shows the button', () => {
//       expect(component).to.exist
//     })

//     test('displays children text', () => {
//       expect(component).to.have.text(children)
//     })

//     test('does not display default text', () => {
//       expect(component).to.not.have.text(defaultText)
//     })

//     test('does not display custom text', () => {
//       expect(component).to.not.have.text(buttonText)
//     })

//     test('does not have a class attr', () => {
//       expect(component).to.not.have.attr('class')
//     })

//     test('has inline styles', () => {
//       expect(component).to.have.attr('style')
//     })
//   })
//   describe('With style and default props', () => {
//     const style = {
//       padding: '10px',
//       fontSize: '20px'
//     }

//     beforeEach(() => {
//       propsObj = {
//         onSuccess(response) {},
//         onFailure(response) {},
//         clientId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com',
//         style
//       }
//       component = renderComponent(GoogleLoginDistDist, propsObj)
//     })

//     test('shows the button', () => {
//       expect(component).to.exist
//     })

//     test('displays correct button text', () => {
//       expect(component).to.have.text(defaultText)
//     })

//     test('has a style with custom class', () => {
//       expect(component).to.have.attr('style', 'padding: 10px; font-size: 20px; opacity: 0.6;')
//     })
//   })
//   describe('With handles custom tag prop', () => {
//     beforeEach(() => {
//       propsObj = {
//         onSuccess(response) {},
//         onFailure(response) {},
//         tag: 'div',
//         clientId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
//       }
//       component = renderComponent(GoogleLoginDistDist, propsObj)
//     })

//     test('shows the button', () => {
//       expect(component).to.exist
//     })

//     test('displays a div element when tag prop is set to div', () => {
//       expect(component.get(0).tagName).to.equal('DIV')
//     })
//   })
