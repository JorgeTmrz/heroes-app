import { mount } from "enzyme"
import { Router } from "react-router-dom"
import { AuthContext } from "../../auth/AuthContext"
import { LoginScreen } from "../../components/login/LoginScreen"
import "../../setupTest"
import { types } from "../../types/types"

describe('LoginScreen test cases', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: "Jorge",
          logged: false,
        },
      };
    
      const historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
        replace: jest.fn()
    }

    const wrapper = mount(
    <AuthContext.Provider value = {contextValue}>
        <Router history = {historyMock}>
            <LoginScreen />
        </Router>
    </AuthContext.Provider>
    )

    test('should display itself correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('should do the dispatch and the navigation', () => {
        wrapper.find("button").simulate("click");

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: "Jorge"
            }})

        expect(historyMock.replace).toHaveBeenCalled();
    })
    
})
