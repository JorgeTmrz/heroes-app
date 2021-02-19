import "../../setupTest";
import { shallow } from "enzyme";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe("Dashboard test cases", () => {
  test("should displayy itself correctly", () => {
    const wrapper = shallow(<DashboardRoutes />);

    expect(wrapper).toMatchSnapshot();
  });
});
