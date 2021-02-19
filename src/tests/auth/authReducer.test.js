import { authReducer } from "../../auth/authReducer";
import "../../setupTest"
import { types } from "../../types/types";

describe('test on authreducer', () => {
    test('should return the default state', () => {
        const state = authReducer();
        expect(state).toEqual({});
    });

    test('should authenticate and place the userName', () => {
        const state = authReducer({},{
            type: types.login,
            payload: {
                name: "Jorge"
            }
        });
        expect(state).toEqual({
            name: "Jorge",
            logged: true
        });
    });

    test('should erase the name and logged on false when logout', () => {
        const state = authReducer({},{
            type: types.logout
        });
        expect(state).toEqual({
            logged: false
        });
    })
})
