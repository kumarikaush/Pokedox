//Reducer for bookmark

export const Bookmarkreducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "Add":
            return { ...state, bookmarklist: payload.res, total: payload.total };
        case "Remove":
            return { ...state, bookmarklist: payload.res, total: payload.total };
        case "All":
            return { ...state, bookmarklist: payload.res, total: payload.total };
        default:
            throw new Error("No match");
    }
}
