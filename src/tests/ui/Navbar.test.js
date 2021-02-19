import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { Navbar } from "../../components/ui/Navbar";
import "../../setupTest";
import { types } from "../../types/types";

describe("Navbar test cases", () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      name: "Jorge",
      logged: true
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
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
          <Router history = {historyMock}>
            <Navbar />
          </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => {
      jest.clearAllMocks();
  })

  test("should display itself correctly", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-danger").text()).toBe(contextValue.user.name);
  });

  test('should call the logout function and use the history', () => {
      wrapper.find("button").simulate("click");

      expect(contextValue.dispatch).toHaveBeenCalledWith({type: types.logout});
      expect(historyMock.replace).toHaveBeenCalledWith("/login")
  })
  
});
