const initState = {
    calc: false,
};

const CalcSum = (state = initState, action) => {
    switch (action.type) {
        case 'CALC_SUM':
            return {
                calc: action.calc,
            };
        default:
            return state;
    }

};

export default CalcSum;