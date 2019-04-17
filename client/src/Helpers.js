import moment from 'moment';

export const getDateStr = (date) => {
    return moment(date).format('D/MM/YYYY');
};

export const isValidDateStr = (str) => {
    var dateReg = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
    return str.match(dateReg);
};