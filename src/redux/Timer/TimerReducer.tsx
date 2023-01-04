import { startTimer } from './TimerActions';

const initialState: any = [
  {
    date: '05/01/2023',
    start: '10:00AM',
    end: '10:00AM',
    breaks: [
      {
        startBreak: '01:00PM',
        endBreak: '02:00PM',
      },
    ],
  },
];

const TimerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case startTimer: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
export default TimerReducer;
