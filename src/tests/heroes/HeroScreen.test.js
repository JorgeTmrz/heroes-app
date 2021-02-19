import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { HeroScreen } from "../../components/heroes/HeroScreen";
import "../../setupTest";

describe("HeroScreen test cases", () => {
  const historyMock = {
    push: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn(),
    replace: jest.fn(),
    length: 10,
    goBack: jest.fn(),
  };

  test('should display the redirect component if there"s no args on the URL', () => {
    const wrapper = mount(
      <MemoryRouter>
        <HeroScreen history={historyMock} />
      </MemoryRouter>
    );
    expect(wrapper.find("Redirect").exists()).toBe(true);
  });

  test("should show a hero if the paramether exist", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route path="/hero/:heroId" component={HeroScreen}></Route>
      </MemoryRouter>
    );

    expect(wrapper.find(".row").exists()).toBe(true);
  });

  test("should return to the previous screen with PUSH", () => {
    const historyMock = {
      push: jest.fn(),
      location: {},
      listen: jest.fn(),
      createHref: jest.fn(),
      replace: jest.fn(),
      length: 1,
      goBack: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route
          path="/hero/:heroId"
          component={(props) => <HeroScreen history={historyMock} />}
        ></Route>
      </MemoryRouter>
    );

    wrapper.find("button").simulate("click");
    expect(historyMock.push).toHaveBeenCalledWith("./");
    expect(historyMock.goBack).not.toHaveBeenCalled();
  });

  test("should call the history.goBack function", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route
          path="/hero/:heroId"
          component={(props) => <HeroScreen history={historyMock} />}
        ></Route>
      </MemoryRouter>
    );

    wrapper.find("button").simulate("click");
    expect(historyMock.goBack).toHaveBeenCalled();
    expect(historyMock.push).not.toHaveBeenCalled();
  });

  test("should call the redirect if the hero doenst exist", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/heroThatDoesntExist"]}>
        <Route
          path="/hero/:heroId"
          component={(props) => <HeroScreen history={historyMock} />}
        ></Route>
      </MemoryRouter>
    );

    expect(wrapper.text()).toBe("");
  });
});
