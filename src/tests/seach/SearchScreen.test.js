import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { SearchScreen } from "../../components/search/SearchScreen";
import "../../setupTest"

describe('SearchScreen test cases', () => {

    const historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
        replace: jest.fn(),
        length: 10,
        goBack: jest.fn(),
      };

      const wrapper = mount(
          <MemoryRouter initialEntries = {['/search']}>
            <Route
              path="/search"
              component={(props) => <SearchScreen history={historyMock} />}
            ></Route>
          </MemoryRouter>
      );

    test('should display itself correctly with default values', () => {

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".alert-info").text().trim()).toBe("Search a hero");
    })

    test('should display batman and the input with the value of the query string', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries = {['/search?q=batman']}>
              <Route
                path="/search"
                component={(props) => <SearchScreen history={historyMock} />}
              ></Route>
            </MemoryRouter>
        );

        expect(wrapper.find("input").prop("value")).toBe("batman")
        expect(wrapper).toMatchSnapshot();
    })

    test('should display an error if the hero is not found', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries = {["/search?q=1234567890"]}>
                <Route
                    path = "/search"
                    component = {(props) => <SearchScreen history = {historyMock}/>}
                ></Route>
            </MemoryRouter>
        )

        expect(wrapper.find(".alert-danger").exists()).toBe(true)
    })
    
    test('should call the push function from the history Mock when form submitting', () => {
        wrapper.find("input").simulate("change", {
            target : {
                name : "search",
                value: "batman"
            }
        });
        wrapper.find("button").simulate("click");

        wrapper.find("form").prop("onSubmit")({
            preventDefault(){}
        });

        expect(historyMock.push).toHaveBeenCalledWith("?q=batman");
    })
    
})
