import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure,shallow} from 'enzyme';
import NavigationItems from './NavigationItems';
import NavItem from './NavItem/NavItem';
configure({adapter : new Adapter()})

describe('<NavigationItems />', ()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />);
    })

    it('should render <NavItem /> elements if not authenicated',()=>{
        
        expect(wrapper.find(NavItem)).toHaveLength(2);
    })
    it('should render <NavItem /> elements if authenicated',()=>{
        wrapper.setProps({isAuth : true})
        expect(wrapper.find(NavItem)).toHaveLength(3);
    })
   
})