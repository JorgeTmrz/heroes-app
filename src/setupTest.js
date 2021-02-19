import "@testing-library/jest-dom";
import { configure } from "enzyme";
import { createSerializer } from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
