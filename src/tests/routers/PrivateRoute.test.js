import {mount} from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import "../../setupTest"
import { PrivateRoute } from '../../routers/PrivateRoute';

describe('PrivateRoute test cases', () => {

    const props = {
        location: {
            pathname: "/marvel"
        }
    }

    Storage.prototype.setItem = jest.fn();

    test('should display the component if the user is authenticated and save it on localstorage', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated = {true}
                    component = {() => <span>Just For the test!</span>}
                    {...props}
                />
            </MemoryRouter>
        )
        
        expect(wrapper.find('span').exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", props.location.pathname)
    });  

    test('should not display the component if its not authenticated', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated = {false}
                    component = {() => <span>Just For the test!</span>}
                    {...props}
                />
            </MemoryRouter>
        )

        expect(wrapper.find("span").exists()).toBe(false);
    })
    
});
