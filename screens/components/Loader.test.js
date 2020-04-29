/**
 * @format
 */

import 'react-native';
import React from 'react';
import Loader from './Loader';
import { userInformation } from "../../lib/user"
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';

configure({adapter: new Adapter()});



// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const createTestProps = (props) => ({
    navigation: {
      navigate: jest.fn()
    },
    ...props
  });


describe('Component: Loader', () => {

 
  it('renders correctly', () => {
    renderer.create(<Loader />);
  });

  fit('redirects to config page when user is not logged in', () => {

     var props = createTestProps({});
     const wrapper = shallow(<Loader {...props}/>)
    // const instance = wrapper.instance()
     jest.mock('../lib/userInformation', () => ({
        userInformation: jest.fn().mockImplementation(() => {
            new Promise((resolve, reject)=>{
                resolve(null)
            })
        })
    }))
    wrapper.update()
   //  instance.forceUpdate() ====> says null?
    expect(props.navigation.navigate).toHaveBeenCalledWith('Login');
      
      
  });



});
